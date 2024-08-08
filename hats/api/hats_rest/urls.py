from django.urls import path
from .views import api_list_hats, api_show_hats

urlpatterns = [
    path('api/hats/', api_list_hats, name='api_list_hats'),
    path('api/hats/<int:pk>/', api_show_hats, name='api_show_hats'),
]
