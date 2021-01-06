from django.contrib import admin
from django.urls import path
from .index import index

import stock.views as twstock
import info.views as info


urlpatterns = [
    # main
    path('', index),
    path('admin/', admin.site.urls),

    # twstock
    path('twstock/hot', twstock.hot),
    path('twstock/info', twstock.info),
    path('twstock/merchant', twstock.merchant),
    path('twstock/income', twstock.income),
    path('twstock/eps', twstock.eps),

    #info
    path('info/googleNews', info.googleNews),
    path('info/ptt', info.ptt),
]
