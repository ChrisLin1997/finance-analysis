from django.http import HttpResponse
import requests
import json

# 台股熱門
def twhot (request):
    res = requests.get('https://www.twse.com.tw/exchangeReport/MI_INDEX20')
    data = json.loads(res.content)
    stockList = []
    for i in range(5):
        stockList.append({
            'id': data['data'][i][1],
            'name': data['data'][i][2],
            'transaction': data['data'][i][4],
            'open': data['data'][i][5],
            'close': data['data'][i][8],
            'high': data['data'][i][6],
            'low': data['data'][i][7],
            'variation': data['data'][i][9][-8:-7] == '+',
            'spread': data['data'][i][10],
        })
    result = json.dumps({
        'data': stockList,
        'date': data['date'],
    })
    return HttpResponse(result)

# 台股市值
def weight (request):
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
def ushot (request):
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
    