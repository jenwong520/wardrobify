from .views import api_list_shoes
from django.urls import path

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
]
