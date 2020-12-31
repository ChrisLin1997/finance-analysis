from django.http import HttpResponse
from datetime import datetime, date
from bs4 import BeautifulSoup
import pandas as pd
import requests
import json
import twstock

CORS = 'https://cors-anywhere.herokuapp.com/'

def convertToFixed (value):
    if type(value) == list: 
        return [ '%.2f' % item for item in value]
    else:
        return '%.2f' % value

# 熱門個股
def hot (request):
    response = requests.get('https://www.twse.com.tw/exchangeReport/MI_INDEX20')
    data = json.loads(response.content)
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
    stockNo = request.GET['stockNo']
    stockInfo = twstock.codes[stockNo]
    stockPrice = twstock.Stock(stockNo)
    dateList = [ datetime.strftime(date, '%Y/%m/%d') for date in stockPrice.date ]
    result = json.dumps({
        'id': stockInfo[1] + stockInfo[5],
        'name': stockInfo[2],
        'ipoTime': stockInfo[4],
        'industry': stockInfo[6],
        'date': dateList,
        'price': convertToFixed(stockPrice.price),
        'variation': convertToFixed(stockPrice.price[-1] - stockPrice.price[-2]),
        'percent': convertToFixed((stockPrice.price[-1] - stockPrice.price[-2]) / stockPrice.price[-2] * 100),
        'currencyPrice': convertToFixed(stockPrice.price[-1])
        # 'transAmount': stockInfo.turnover,
        # 'transactions': stockInfo.transaction,
        # 'open': stockInfo.close,
        # 'high': stockInfo.high,
        # 'low': stockInfo.low,
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

def income (request):
    stockNo = request.GET['stockNo']

    today = date.today()
    year = int(today.strftime('%Y')) - 1911
    month = int(today.strftime('%m')) - 1

    url = f'https://mops.twse.com.tw/nas/t21/sii/t21sc03_109_11_0.html'
    html = pd.read_html(url)
    
    htmlFilterList = pd.concat([item for item in html if item.shape[1] <= 11 and item.shape[1] > 5])

    # 取得近一年月份
    monthList = []
    for i in range(12):
        monthList.append(f'{year}_{month}')
        month -= 1
        if (month == 0):
            year -= 1
            month = 12

    # 取得各月營收報表
    incomeList = []
    for month in monthList:
        url = f'https://mops.twse.com.tw/nas/t21/sii/t21sc03_{month}_0.html'
        html = pd.read_html(url)
        htmlFilterList = pd.concat([item for item in html if item.shape[1] <= 11 and item.shape[1] > 5]).values.tolist()
        # 取得個股營收
        for item in htmlFilterList:
            if item[0] == stockNo:
                incomeList.append(item[2])
                break

    result = json.dumps({
        'income' : incomeList,
    })
    
    return HttpResponse(result)
