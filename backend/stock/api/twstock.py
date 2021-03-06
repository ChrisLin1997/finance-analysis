from stock.api.globals import CORS, ROCyear, month
from django.http import HttpResponse
from datetime import datetime
from bs4 import BeautifulSoup
import requests
import json
import twstock

def convertToFixed (value):
    if type(value) == list: 
        return [ '%.2f' % item for item in value]
    else:
        return '%.2f' % value

# 熱門個股
def hot (request):
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

# 股票資訊
def info (request):
    stockNo = request.GET['stockNo'] + '.TW'
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + stockNo
    res = requests.get(url, headers = headers)
    rawData = res.content.decode("UTF-8")
    item = json.loads(rawData)['quoteResponse']['result'][0]


    if item['regularMarketChange']['fmt'].find('-') == -1:
        isUp = True
    else:
        isUp = False

    result = json.dumps({
        'id': item['symbol'],
        'name': item['longName'],
        'price': item['regularMarketPrice']['fmt'],
        'change': item['regularMarketChange']['fmt'],
        'changePercent': item['regularMarketChangePercent']['fmt'],
        'high': item['regularMarketDayHigh']['fmt'],
        'low': item['regularMarketDayLow']['fmt'],
        'currency': item['currency'],
        'isUp': isUp,
    })
    return HttpResponse(result)

# 價格走勢
def price (request):
    stockNo = request.GET['stockNo']
    stockPrice = twstock.Stock(stockNo)
    dateList = [ datetime.strftime(date, '%Y/%m/%d') for date in stockPrice.date ]
    result = json.dumps({
        'date': dateList,
        'price': convertToFixed(stockPrice.price),
    })
    return HttpResponse(result)

# 即時交易,最佳五檔資訊
def merchant (request):
    stockNo = 'tse_' + request.GET['stockNo'] + '.tw'
    time = request.GET['time']
    payload = {
        'ex_ch': stockNo,
        '_': time,
        'delay': 0,
    }
    stockResponse = requests.get('https://mis.twse.com.tw/stock/api/getStockInfo.jsp', params = payload)
    oddResponse = requests.get('https://mis.twse.com.tw/stock/api/getOddInfo.jsp', params = payload)

    try:
        stockData = json.loads(stockResponse.content)['msgArray'][0]
        oddData = json.loads(oddResponse.content)['msgArray'][0]
    except:
        result = json.dumps({ 'status': False })
        return HttpResponse(result)


    buyList = []
    sellList = []
    oddBuyList = []
    oddSellList = []
    
    default = {
        'price': '',
        'amount': '',
    }

    rawStockBuyPrice = stockData['b'].split('_')
    rawStockBuyAmount = stockData['g'].split('_')
    
    rawStockSellPrice = stockData['a'].split('_')
    rawStockSellAmount = stockData['f'].split('_')

    rawOddBuyPrice = oddData['b'].split('_')
    rawOddBuyAmount = oddData['g'].split('_')
    
    rawOddSellPrice = oddData['a'].split('_')
    rawOddSellAmount = oddData['f'].split('_')


    for i in range(5):
        # stock buy
        try:
            buyList.append({ 'price': rawStockBuyPrice[i], 'amount': rawStockBuyAmount[i] })
        except:
            buyList.append(default)
        # stock sell
        try:
            sellList.append({ 'price': rawStockSellPrice[i], 'amount': rawStockSellAmount[i] })
        except:
            sellList.append(default)
        # odd buy
        try:
            oddBuyList.append({ 'price': rawOddBuyPrice[i], 'amount': rawOddBuyAmount[i] })
        except:
            oddBuyList.append(default)
        # odd sell
        try:
            oddSellList.append({ 'price': rawOddSellPrice[i], 'amount': rawOddSellAmount[i] })
        except:
            oddSellList.append(default)
    
    result = json.dumps({
        'status': True,
        'stock': { 'buy': buyList, 'sell': sellList },
        'odd': { 'buy': oddBuyList, 'sell': oddSellList },
    })
    return HttpResponse(result)

# 營收
def income (request):
    stockNo = request.GET['stockNo']

    incomeYear = ROCyear
    incomeMonth = month

    # 取得各月營收報表
    data = { 'month': [], 'income': [] }
    headers = { 'origin': 'https://mops.twse.com.tw/' }
    times = 0
    while len(data['income']) < 12 and times < 15:
        times += 1
        res = requests.get(f'https://mops.twse.com.tw/nas/t21/sii/t21sc03_{incomeYear}_{incomeMonth}.html', headers = headers)
        soup = BeautifulSoup(res.content.decode('utf-8', 'ignore'), 'lxml')
        allData = soup.findAll('tr', attrs = { 'align' : 'right' })
        
        # 查找個股營收
        for item in allData:
            if item.text[:4] == stockNo:
                data['income'].append(int(item.findAll('td')[2].text.replace(',', '')) * 1000)
                data['month'].append(f'{incomeYear + 1911}/{incomeMonth}')
                break

        incomeMonth -= 1
        if incomeMonth == 0:
            incomeYear -= 1
            incomeMonth = 12
    
    data['month'].reverse()
    data['income'].reverse()

    result = json.dumps(data)
    return HttpResponse(result)

# EPS
def eps (request):
    stockNo = request.GET['stockNo']
    data = {
        'encodeURIComponent': '1',
        'firstin': '1',
        'step': '1',
        'off': '1',
        'isQuery': 'Y',
        'TYPEK': 'sii',
        'isnew': False,
        'co_id': stockNo,
        'year': ROCyear,
    }

    resultData = { 'eps': [], 'season': [] }
    times = 0

    while len(resultData['eps']) < 12  and times < 4:
        res = requests.post('https://mops.twse.com.tw/mops/web/ajax_t163sb15', data = data)
        soup = BeautifulSoup(res.content, 'lxml')

        try:
            seasonEpsList = [ float(eps.text) for eps in soup.findAll('tr')[-1].findAll('td') if eps.text != '-' ]
        except:
            data['year'] -= 1
            continue

        rawEpsList = []
        rawSeasonList = []
        for index, value in enumerate(seasonEpsList):
            rawSeasonList.append(f'{data["year"] + 1911} Q{index + 1}')

            if len(rawEpsList) > 0:
                rawEpsList.append(round(value - seasonEpsList[index - 1], 2))
            else:
                rawEpsList.append(value)

        rawSeasonList.reverse()
        rawEpsList.reverse()

        for index in range(len(rawEpsList)):
            resultData['season'].append(rawSeasonList[index])
            resultData['eps'].append(rawEpsList[index])

        data['year'] -= 1
        times += 1

    resultData['eps'].reverse()
    resultData['season'].reverse()
    result = json.dumps(resultData)
    return HttpResponse(result)
