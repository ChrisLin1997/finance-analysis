from django.http import HttpResponse
from datetime import datetime
import requests
import json
import twstock

CORS = 'https://cors-anywhere.herokuapp.com/'


def history (request):
    stockInfo = twstock.Stock(request.GET['stockNo'])
    dateList = [ datetime.strftime(date, '%Y/%m/%d') for date in stockInfo.date ]

    result = json.dumps({
        'status': 200,
        'data': {
            'date': dateList,
            'price': stockInfo.price,
            # 'transAmount': stockInfo.turnover,
            # 'transactions': stockInfo.transaction,
            # 'open': stockInfo.close,
            # 'high': stockInfo.high,
            # 'low': stockInfo.low,
        }
    })

    return HttpResponse(result)
# def info (request):
#     stockNo = request.GET['stockNo']
#     payload = {
#         'stockNo': stockNo
#     }
#     result = requests.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', params = payload)

#     return HttpResponse(result)

def hot (request):
    result = requests.get('https://www.twse.com.tw/exchangeReport/MI_INDEX20')

    return HttpResponse(result)
