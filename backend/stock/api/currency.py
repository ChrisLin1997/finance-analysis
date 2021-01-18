from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json

def currency (request):
    mapping = {
      'USDTWD=X': '美元',
      'CNYTWD=X': '人民幣',
      'JPYTWD=X': '日幣',
      'HKDTWD=X': '港幣',
      'KRWTWD=X': '韓幣',
      'THBTWD=X': '泰幣',
      'EURTWD=X': '歐元',
      'CADTWD=X': '加幣',
      'AUDTWD=X': '澳幣',
      'GBPTWD=X': '英鎊',

      'TWDUSD=X': '美元',
      'TWDCNY=X': '人民幣',
      'TWDJPY=X': '日幣',
      'TWDHKD=X': '港幣',
      'TWDKRW=X': '韓幣',
      'TWDTHB=X': '泰幣',
      'TWDEUR=X': '歐元',
      'TWDCAD=X': '加幣',
      'TWDAUD=X': '澳幣',
      'TWDGBP=X': '英鎊',
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    indexStr = ','.join(dict.keys(mapping))
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexStr
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']

    foreignList = []
    localList = []
    for item in data:
      currencyItem = {
        'id': item['shortName'],
        'name': mapping[item['symbol']],
        'price': item['regularMarketPrice']['fmt'],
        'change': item['regularMarketChange']['fmt'],
        'changePercent': item['regularMarketChangePercent']['fmt'],
        'buy': item['bid']['fmt'],
        'sell': item['ask']['fmt'],
      }

      if currencyItem['change'].find('-') == -1:
        currencyItem['isUp'] = True
      else:
        currencyItem['isUp'] =  False

      if item['currency'] == 'TWD':
        foreignList.append(currencyItem)
      else:
        localList.append(currencyItem)
      

    result = json.dumps({
      'foreign': foreignList,
      'local': localList,
    })

    return HttpResponse(result)