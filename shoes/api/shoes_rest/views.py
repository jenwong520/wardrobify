from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Shoes, BinVO
from django.http import JsonResponse
from common.json import ModelEncoder
import json

# Create your views here.

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href"
        ]

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ["manufacturer"]

class ShoesDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin"
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        shoes = Shoes.objects.filter(bin=bin_vo_id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoesListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = f'/api/bin/{bin_vo_id}/'
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin


        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
                )

        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoesDetailEncoder,
            safe=False,
        )

