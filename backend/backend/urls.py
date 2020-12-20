from django.contrib import admin
from django.urls import path
from stock.views import info
from .index import index


urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('stock/info', info),
]
