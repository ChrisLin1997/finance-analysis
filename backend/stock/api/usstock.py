from django.http import HttpResponse
from datetime import datetime, date
from bs4 import BeautifulSoup
import requests
import json

def info (request):
    stockNo = request.GET['stockNo']
    headers = { 'origin': 'https://tw.stock.yahoo.com/' }
    url = 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + stockNo
    res = requests.get(url, headers = headers)

    rawData = res.content.decode("UTF-8")
    data = json.loads(rawData)['quoteResponse']['result']

    return HttpResponse(json.dumps(data))
