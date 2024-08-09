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
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id"
        ]

    def get_extra_data(self, o):
        return {
            "closet_name": o.bin.closet_name,
            "bin_number": o.bin.bin_number,
            "bin_size": o.bin.bin_size
        }


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
        shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoesListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            # bin_href = f'/api/bins/{content["bin"]}/'
            # print("##########", bin_href)
            bin_id = content["bin"]
            bin = BinVO.objects.get(id=bin_id) #this is doing a search of the database, it's matching the import_href to the href in the data entered in Insomnia
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

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_shoes(request, id):
    if request.method == "GET":
        shoes = Shoes.objects.get(id=id)
        return JsonResponse(shoes, encoder=ShoesDetailEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Shoes.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "bin" in content:
                bin = BinVO.objects.get(id=content["bin"])
                content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Bin does not exist"},
                status=400,
            )

        Shoes.objects.filter(id=id).update(**content)
        shoes = Shoes.objects.get(id=id)
        return JsonResponse(
            shoes,
            encoder=ShoesDetailEncoder,
            safe=False,
        )
