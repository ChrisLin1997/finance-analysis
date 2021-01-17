from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json

def currency (request):
    mapping = {
      'USDTWD=X': '台幣/1美元',
      'CNYTWD=X': '台幣/1人民幣',
      'JPYTWD=X': '台幣/1日幣',
      'HKDTWD=X': '台幣/1港幣',
      'KRWTWD=X': '台幣/1韓幣',
      'THBTWD=X': '台幣/1泰幣',
      'EURTWD=X': '台幣/1歐元',
      'CADTWD=X': '台幣/1加幣',
      'AUDTWD=X': '台幣/1澳幣',
      'GBPTWD=X': '台幣/1英鎊',

      'TWDUSD=X': '美元/1台幣',
      'TWDCNY=X': '人民幣/1台幣',
      'TWDJPY=X': '日幣/1台幣',
      'TWDHKD=X': '港幣/1台幣',
      'TWDKRW=X': '韓幣/1台幣',
      'TWDTHB=X': '泰幣/1台幣',
      'TWDEUR=X': '歐元/1台幣',
      'TWDCAD=X': '加幣/1台幣',
      'TWDAUD=X': '澳幣/1台幣',
      'TWDGBP=X': '英鎊/1台幣',
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