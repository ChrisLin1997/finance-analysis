from django.contrib import admin
from django.urls import path
from .index import index

import stock.api.home as home
import stock.api.stockmarket as stockmarket
import stock.api.twstock as twstock
import stock.api.usstock as usstock
import stock.api.currency as currency
import stock.api.virtual as virtual
import stock.api.goods as goods


urlpatterns = [
    # main
    path('', index),
    path('admin/', admin.site.urls),

    #info
    path('home/googleNews', home.googleNews),
    path('home/ptt', home.ptt),
    path('home/index', home.index),

    # stock-market
    path('stockmarket/tw/hot', stockmarket.twhot),
    path('stockmarket/tw/weight', stockmarket.weight),
    path('stockmarket/us/hot', stockmarket.ushot),

    # twstock
    path('twstock/info', twstock.info),
    path('twstock/price', twstock.price),
    path('twstock/merchant', twstock.merchant),
    path('twstock/eps', twstock.eps),
    path('twstock/income', twstock.income),

    # usstock
    path('usstock/info', usstock.info),

    # currency
    path('currency/index', currency.index),

    # virtual
    path('virtual/index', virtual.index),

    # goods
    path('goods/index', goods.index),
]
