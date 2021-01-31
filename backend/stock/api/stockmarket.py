from django.http import HttpResponse
import requests
import json

#
def twETF (request):
    mapping = {
      '0050.TW': '元大台灣50',
      '0056.TW': '元大高股息',
      '00881.TW': '國泰台灣5G+',
      '00757.TW': '統一FANG+',
      '00830.TW': '國泰費城半導體',
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    indexStr = ','.join(dict.keys(mapping))
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexStr
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']
    
    twWeightList = []
    for item in data:
      currencyItem = {
        'id': item['symbol'],
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

      twWeightList.append(currencyItem)
      
    result = json.dumps(twWeightList)
    return HttpResponse(result)

# 台股熱門
def twHot (request):
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    url = 'https://tw.stock.yahoo.com/_td/api/resource/StockServices.rank;exchange=ALL;limit=5;offset=0;period=1D;sortBy=-volume?bkt=tw-stock-exp&device=desktop&ecma=default&feature=&intl=tw&lang=zh-Hant-TW&partner=none&prid=e2nkh7dg1d6j2&region=TW&site=finance&tz=Asia%2FTaipei&ver=1.2.710&returnMeta=true'
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['data']['list']

    hotList = []
    for item in data[0:5]:
      currencyItem = {
        'id': item['symbol'][0:-3],
        'name': item['name'],
        'price': item['price'],
        'change': item['change'],
        'changePercent': item['changePercent'],
      }
      if currencyItem['change'].find('-') == -1:
        currencyItem['isUp'] = True
      else:
        currencyItem['isUp'] =  False

      hotList.append(currencyItem)

    result = json.dumps(hotList)
    return HttpResponse(result)

# 台股市值
def twMarketValue (request):
    mapping = {
      '2330.TW': '台積電',
      '2317.TW': '鴻海',
      '2454.TW': '聯發科',
      '6505.TW': '台塑化',
      '2412.TW': '中華電',
      '2308.TW': '台達電',
      '2303.TW': '聯電',
      '1301.TW': '台塑',
      '2882.TW': '國泰金',
      '1303.TW': '南亞',
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    indexStr = ','.join(dict.keys(mapping))
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexStr
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']
    
    twWeightList = []
    for item in data:
      currencyItem = {
        'id': item['symbol'],
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

      twWeightList.append(currencyItem)
      
    result = json.dumps(twWeightList)
    return HttpResponse(result)
    



# 美股熱門
def usMarketValue (request):
    mapping = {
      'AAPL': '蘋果',
      'TSLA': '特斯拉',
      'NFLX': '網飛',
      'AMZN': '亞馬遜',
      'GOOG': '谷歌',
      'FB': '臉書',
      'MSFT': '微軟',
      'NVDA': '輝達',
      'TSM': '台積電 ADR',
      'ASML': '艾斯摩爾'
    }
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    indexStr = ','.join(dict.keys(mapping))
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexStr
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']
    
    twWeightList = []
    for item in data:
      currencyItem = {
        'id': item['symbol'],
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

      twWeightList.append(currencyItem)
      
    result = json.dumps(twWeightList)
    return HttpResponse(result)
    