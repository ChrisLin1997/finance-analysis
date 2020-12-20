from django.shortcuts import render
from django.http import JsonResponse

def info (request):
    print(request.method)
    return JsonResponse({'status': 200, 'msg': 'stock'})
