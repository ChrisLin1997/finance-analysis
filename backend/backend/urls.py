from django.contrib import admin
from django.urls import path
from stock.views import info

urlpatterns = [
    path('admin/', admin.site.urls),
    path('stock/info', info),
]
