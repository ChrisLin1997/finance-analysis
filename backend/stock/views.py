from django.http import HttpResponse
from datetime import datetime
import requests
import json
import twstock

CORS = 'https://cors-anywhere.herokuapp.com/'

# 熱門個股
def hot (request):
    response = requests.get('https://www.twse.com.tw/exchangeReport/MI_INDEX20')
    data = json.loads(response.content)
    stockList = []
    for i in range(6):
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

def info (request):
    stockNo = request.GET['stockNo']
    stockInfo = twstock.codes[stockNo]
    result = json.dumps({
        'id': stockInfo[1],
        'name': stockInfo[2],
        'type': stockInfo[5],
        'ipoTime': stockInfo[4],
        'industry': stockInfo[6],
    })

    return HttpResponse(result)

# 歷史股價
def history (request):
    stockInfo = twstock.Stock(request.GET['stockNo'])
    dateList = [ datetime.strftime(date, '%Y/%m/%d') for date in stockInfo.date ]
    result = json.dumps({
        'date': dateList,
        'price': stockInfo.price,
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
    response = requests.get('https://mis.twse.com.tw/stock/api/getStockInfo.jsp', params = payload)
    data = json.loads(response.content)['msgArray'][0]

    buyList = []
    sellList = []

    for i in range(4):
        buyList.append({
            'price': data['b'].split('_')[i],
            'amount': data['g'].split('_')[i],
        })
        sellList.append({
            'price': data['a'].split('_')[i],
            'amount': data['f'].split('_')[i],
        })
    
    result = json.dumps({
        'buy': buyList,
        'sell': sellList,
    })

    return HttpResponse(result)
