from .views import api_list_shoes, api_show_shoes
from django.urls import path

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
    path("shoes/<int:id>/", api_show_shoes, name="api_show_shoes"),
]
