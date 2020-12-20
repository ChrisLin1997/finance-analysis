from django.shortcuts import render
from django.http import HttpResponse

def info (request):
    return HttpResponse({'status': 200, 'msg': 'stock'})
