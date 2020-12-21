from django.contrib import admin
from django.urls import path
from .index import index
import stock.views as twstock


urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('twstock/info', twstock.info),
    path('twstock/hot', twstock.hot),
]
