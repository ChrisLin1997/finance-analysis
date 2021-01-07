from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json

newsLength = 50

CORS = 'https://cors-anywhere.herokuapp.com/'

def majorIndex (request):
    indexMapping = {
      ''
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols='
    indexStr = ','.join([ '^GSPC', '^DJI', '^IXIC', '^SOX', '^VIX', '^TWII', '^N225', '^HSI', '^KS11', '^FTSE' ])
    res = requests.get(CORS + url + indexStr, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']

    indexList = []
    for item in data:
      print(item)
      indexList.append({
        'id': item['shortName'],
        'price': item['regularMarketPrice']['fmt'],
        'change': item['regularMarketChange']['fmt'],
        'changePrice': item['regularMarketChangePercent']['fmt'],
        'high': item['regularMarketDayHigh']['fmt'],
        'low': item['regularMarketDayLow']['fmt'],
      })
    result = json.dumps(indexList)

    return HttpResponse(result)

def googleNews (request):
  newsType = request.GET['type']

  typeMapping = {
    'global': 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JYcG9MVlJYR2dKVVZ5Z0FQAQ',
    'finance': 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JYcG9MVlJYR2dKVVZ5Z0FQAQ',
  }
  res = requests.get(f'https://news.google.com/topics/{typeMapping[newsType]}?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant')
  data = BeautifulSoup(res.content, 'lxml').select('article > h3 > a', limit = newsLength)

  financeNewsList = []
  for index, item in enumerate(data):
    financeNewsList.append({
      'id': index,
      'title': item.text,
      'href': item.get('href').replace('.', 'https://news.google.com', 1),
    })

  result = json.dumps(financeNewsList)
  return HttpResponse(result)

def ptt (request):
  domain = 'https://www.ptt.cc'
  path = '/bbs/Stock/index.html'

  pttNewsList = []
  id = 0
  while len(pttNewsList) < newsLength:
    res = requests.get(domain + path)
    soup = BeautifulSoup(res.content, 'lxml')
    path = soup.select('.btn-group-paging > .btn')[1].get('href')
    data = soup.select('.title > a')
    amount = soup.select('.nrec')

    for index, item in enumerate(data):
      if len(pttNewsList) >= newsLength:
        break

      id += 1
      pttNewsList.append({
        'id': id,
        'title': item.text,
        'href': domain + item.get('href'),
        'amount': amount[index].text
      })
  
  result = json.dumps(pttNewsList[0:newsLength])
  return HttpResponse(result)
