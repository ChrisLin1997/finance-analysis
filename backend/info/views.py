from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json

newsLength = 50

def googleNews (request):
  newsType = request.GET['type']

  typeMapping = {
    'global': 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JYcG9MVlJYR2dKVVZ5Z0FQAQ',
    'finance': 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JYcG9MVlJYR2dKVVZ5Z0FQAQ',
  }
  res = requests.get(f'https://news.google.com/topics/{typeMapping[newsType]}?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant')
  data = BeautifulSoup(res.content, 'lxml').select('article > h3 > a', limit = newsLength)

  financeNewsList = []
  for index, item in enumerate(data):
    financeNewsList.append({
      'id': index,
      'title': item.text,
      'href': item.get('href').replace('.', 'https://news.google.com', 1),
    })

  result = json.dumps(financeNewsList)
  return HttpResponse(result)

def ptt (request):
  domain = 'https://www.ptt.cc'
  path = '/bbs/Stock/index.html'

  pttNewsList = []
  id = 0
  while len(pttNewsList) < newsLength:
    res = requests.get(domain + path)
    soup = BeautifulSoup(res.content, 'lxml')
    path = soup.select('.btn-group-paging > .btn')[1].get('href')
    data = soup.select('.title > a')
    amount = soup.select('.nrec')

    for index, item in enumerate(data):
      if len(pttNewsList) >= newsLength:
        break

      id += 1
      pttNewsList.append({
        'id': id,
        'title': item.text,
        'href': domain + item.get('href'),
        'amount': amount[index].text
      })
  
  result = json.dumps(pttNewsList[0:newsLength])
  return HttpResponse(result)
