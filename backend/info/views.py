from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json

def googleNews (request):
  newsType = request.GET['type']

  typeMapping = {
    'global': 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JYcG9MVlJYR2dKVVZ5Z0FQAQ',
    'finance': 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JYcG9MVlJYR2dKVVZ5Z0FQAQ',
  }
  res = requests.get(f'https://news.google.com/topics/{typeMapping[newsType]}?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant')
  soup = BeautifulSoup(res.content, 'lxml').select('article > h3 > a', limit=50)

  financeNewsList = []
  id = 1
  for item in soup:
    financeNewsList.append({
      'id': id,
      'title': item.text,
      'href': item.get('href').replace('.', 'https://news.google.com', 1),
    })
    id += 1

  result = json.dumps(financeNewsList)
  return HttpResponse(result)

def ptt (request):
  res = requests.get('https://www.ptt.cc/bbs/Stock/index.html')
  soup = BeautifulSoup(res.content)
  print(soup)
  return HttpResponse('ptt')
