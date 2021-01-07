from django.contrib import admin
from django.urls import path
from .index import index

import stock.twstock as twstock
import stock.info as info


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
    path('twstock/merchant', twstock.merchant),
    path('twstock/income', twstock.income),
    path('twstock/eps', twstock.eps),
]
