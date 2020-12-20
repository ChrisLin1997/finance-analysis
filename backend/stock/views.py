from django.shortcuts import render
from django.http import JsonResponse

def chart (request):
    print(request.method)
    return JsonResponse({'status': 200, 'msg': 'stock'})
