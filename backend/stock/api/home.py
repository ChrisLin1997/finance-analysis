from stock.api.globals import CORS, NewsApiKey, newsLength
from newsapi import NewsApiClient
from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json

def index (request):
    mapping = {
      '^IXIC': 'NASDAQ指數',
      '^SOX': '費城半導體指數',
      '^NYFANG': 'FANG+ 指數',
      '^GSPC': 'S&P 500指數',
      '^DJI': '道瓊工業指數',
      '^TWII': '臺灣加權指數',
      '^VIX': 'VIX恐懼指數',
      '^HSI': '香港恆生指數',
      '^N225': '日經指數',
      '^KS11': '韓國綜合指數',
      '^FTSE': '英國股市',
      '^GDAXI': '德國股市',
      '^FCHI': '法國股市',
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    indexStr = ','.join(dict.keys(mapping))
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexStr
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']

    indexList = []
    for item in data:
      indexItem = {
        'id': item['shortName'],
        'name': mapping[item['symbol']],
        'price': item['regularMarketPrice']['fmt'],
        'change': item['regularMarketChange']['fmt'],
        'changePercent': item['regularMarketChangePercent']['fmt'],
        'high': item['regularMarketDayHigh']['fmt'],
        'low': item['regularMarketDayLow']['fmt'],
      }

      if indexItem['change'].find('-') == -1:
        indexItem['isUp'] = True
      else:
        indexItem['isUp'] =  False
      
      indexList.append(indexItem)

    result = json.dumps(indexList)
    return HttpResponse(result)

def googleNews (request):
  newsType = request.GET['type']
  newsapi = NewsApiClient(api_key='00942a082b944507982c1e8c2cbba299')
  top_headlines = newsapi.get_top_headlines(
    category = newsType,
    language = 'zh',
    country = 'tw',
    page_size = 50,
  )

  result = json.dumps(top_headlines['articles'])
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
