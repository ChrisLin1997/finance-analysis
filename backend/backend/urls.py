from django.contrib import admin
from django.urls import path
from .index import index
import stock.views as twstock


urlpatterns = [
    # main
    path('', index),
    path('admin/', admin.site.urls),

    # twstock
    path('twstock/hot', twstock.hot),
    path('twstock/info', twstock.info),
    path('twstock/merchant', twstock.merchant),
    path('twstock/income', twstock.income),
]
