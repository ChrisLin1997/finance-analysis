from django.http import HttpResponse
import requests
import json

def index (request):
    mapping = {
      'CL=F': '紐約輕原油',
      'HO=F': '熱燃油',
      'NG=F': '天然氣',
      'GC=F': '黃金',
      'PL=F': '白金',
      'SI=F': '白銀',
      'HG=F': '銅',
      'PA=F': '鈀',
      'C=F': '玉米',
      'RR=F': '稻榖',
      'S=F': '黃豆',
      'CC=F': '可可豆',
      'KC=F': '咖啡豆',
      'CT=F': '棉花',
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    indexStr = ','.join(dict.keys(mapping))
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexStr
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']
    
    virtualList = []
    for item in data:
      currencyItem = {
        'id': ' '.join(item['shortName'].split(' ')[0:-2]),
        'name': mapping[item['symbol']],
        'price': item['regularMarketPrice']['fmt'],
        'change': item['regularMarketChange']['fmt'],
        'changePercent': item['regularMarketChangePercent']['fmt'],
        'low': item['regularMarketDayLow']['fmt'],
        'high': item['regularMarketDayHigh']['fmt'],
      }

      if currencyItem['change'].find('-') == -1:
        currencyItem['isUp'] = True
      else:
        currencyItem['isUp'] =  False

      virtualList.append(currencyItem)
      
    result = json.dumps({ 'data': virtualList })
    return HttpResponse(result)
