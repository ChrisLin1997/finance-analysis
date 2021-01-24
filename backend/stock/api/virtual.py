from django.http import HttpResponse
import requests
import json

def index (request):
    mapping = {
      'BTC-USD': 'BTC/USD',
      'ETH-USD': 'ETH/USD',
      'XRP-USD': 'XRP/USD',
      'BNB-USD': 'BNB/USD',
      'LINK-USD': 'LINK/USD',
      'LTC-USD': 'LTC/USD',
      'EOS-USD': 'EOS/USD',
      'XLM-USD': 'XLM/USD',
      'ADA-USD': 'ADA/USD',
      'USDT-USD': 'USDT/USD',
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
        'avatar': item['shortName'].split(' ')[0],
        'id': mapping[item['symbol']],
        'name': item['shortName'].split(' ')[0],
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
