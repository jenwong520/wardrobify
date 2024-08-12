from common.json import ModelEncoder
from .models import Hats, LocationVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "closet_name",
        "import_href",
    ]

class HatListEncoder(ModelEncoder):
    model = Hats
    properties = [
        "style_name",
        "fabric",
        "color",
        "picture_url",
        "id",
    ]

    def get_extra_data(self, o):
        return {
            "closet_name": o.location.closet_name,
            "section_number": o.location.section_number,
            "shelf_number": o.location.shelf_number,
        }

class HatDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "id",
        "style_name",
        "fabric",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hats.objects.all()
        return JsonResponse(
            {"hats": list(hats)},
            encoder=HatListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        try:
            my_href = content["location"]
            location = LocationVO.objects.get(import_href=my_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"Message": "Invalid Location ID 1"},
                status=400,
            )

        hats = Hats.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_hats(request, pk):
    try:
        hats = Hats.objects.get(id=pk)
        if request.method == "GET":
            return JsonResponse(
                hats,
                encoder=HatDetailEncoder,
                safe=False
            )
        elif request.method == "DELETE":
            hats.delete()
            return JsonResponse(
                {"Message": "Hat Deleted Successfully"},
            )
        else:
            content = json.loads(request.body)
            if "location" in content:
                location_href = content["location"]
                try:
                    location = LocationVO.objects.get(import_href=location_href)
                    content["location"] = location
                except LocationVO.DoesNotExist:
                    return JsonResponse(
                        {"Message": "Invalid Location ID 2"},
                        status=400,
                    )

            try:
                Hats.objects.filter(id=pk).update(**content)
                hats = Hats.objects.get(id=pk)
                return JsonResponse(
                    hats,
                    encoder=HatDetailEncoder,
                    safe=False,
                )
            except Hats.DoesNotExist:
                return JsonResponse(
                {"Message": "Hat Not Found"},
                status=404
                )

    except Hats.DoesNotExist:
        return JsonResponse(
            {"Message": "Hat Not Found"},
            status=404
        )
