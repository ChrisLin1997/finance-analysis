from django.http import HttpResponse
from datetime import datetime
import requests
import json
import twstock

cors = 'https://cors-anywhere.herokuapp.com/'

def info (request):
    stockInfo = twstock.Stock(request.GET['stockId'])
    dateList = [ datetime.strftime(date, '%Y/%m/%d') for date in stockInfo.date ]

    result = json.dumps({
        'status': 200,
        'data': {
            'date': dateList,
            'transAmount': stockInfo.turnover,
            'transactions': stockInfo.transaction,
            'open': stockInfo.close,
            'close': stockInfo.price,
            'high': stockInfo.high,
            'low': stockInfo.low,
        }
    })

    return HttpResponse(result)
