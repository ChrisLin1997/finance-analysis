from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json

newsLength = 50

CORS = 'https://cors-anywhere.herokuapp.com/'

def majorIndex (request):
    indexMapping = {
      '^GSPC': 'S&P 500指數',
      '^DJI': '道瓊工業指數',
      '^IXIC': 'NASDAQ指數',
      '^SOX': '費城半導體指數',
      '^VIX': 'VIX恐懼指數',
      '^TWII': '臺灣加權指數',
      '^N225': '日經指數',
      '^HSI': '香港恆生指數',
      '^KS11': '韓國綜合指數',
      '^FTSE': '英國股市',
      '^GDAXI': '德國股市',
      '^FCHI': '法國股市',
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    indexStr = ','.join(dict.keys(indexMapping))
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexStr
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']

    indexList = []
    for item in data:
      indexList.append({
        'id': item['shortName'],
        'name': indexMapping[item['symbol']],
        'price': item['regularMarketPrice']['fmt'],
        'change': item['regularMarketChange']['fmt'],
        'changePercent': item['regularMarketChangePercent']['fmt'],
        'high': item['regularMarketDayHigh']['fmt'],
        'low': item['regularMarketDayLow']['fmt'],
      })
      if item['regularMarketChange']['fmt'].find('-') == -1:
        indexList[-1]['isUp'] = True
      else:
        indexList[-1]['isUp'] =  False

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
