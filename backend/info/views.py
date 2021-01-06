from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
import json


def news (request):
  res = requests.get('https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JYcG9MVlJYR2dKVVZ5Z0FQAQ?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant')
  soup = BeautifulSoup(res.content).findAll('article')
  print(soup)

  return HttpResponse('news')

def ptt (request):
  return HttpResponse('ptt')