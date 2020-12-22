from django.http import HttpResponse
from datetime import datetime
import requests
import json
import twstock

cors = 'https://cors-anywhere.herokuapp.com/'

def info (request):
    params = {
        'stockNo': request.GET('stockNo')
    }
    result = requests.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', params = params)

    return HttpResponse(result)

def hot (request):
    result = requests.get('https://www.twse.com.tw/exchangeReport/MI_INDEX20')

    return HttpResponse(result)

# def realtime (request):
#     stockInfo = twstock.Stock(request.GET['stockId'])
#     dateList = [ datetime.strftime(date, '%Y/%m/%d') for date in stockInfo.date ]

#     result = json.dumps({
#         'status': 200,
#         'data': {
#             'date': dateList,
#             'transAmount': stockInfo.turnover,
#             'transactions': stockInfo.transaction,
#             'open': stockInfo.close,
#             'close': stockInfo.price,
#             'high': stockInfo.high,
#             'low': stockInfo.low,
#         }
#     })

#     return HttpResponse(result)


