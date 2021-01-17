from django.contrib import admin
from django.urls import path
from .index import index

import stock.api.info as info
import stock.api.twstock as twstock
import stock.api.usstock as usstock
import stock.api.currency as currency


urlpatterns = [
    # main
    path('', index),
    path('admin/', admin.site.urls),

    #info
    path('info/googleNews', info.googleNews),
    path('info/ptt', info.ptt),
    path('info/majorIndex', info.majorIndex),

    # twstock
    path('twstock/hot', twstock.hot),
    path('twstock/info', twstock.info),
    path('twstock/price', twstock.price),
    path('twstock/merchant', twstock.merchant),
    path('twstock/eps', twstock.eps),
    path('twstock/income', twstock.income),

    # usstock
    path('usstock/info', usstock.info),

    #currency
    path('currency/exchange', currency.currency)
]
