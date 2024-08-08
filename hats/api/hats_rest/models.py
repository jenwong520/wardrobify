from django.db import models

class LocationVO(models.Model):
    import_href = models.URLField(unique=True)
    closet_name = models.CharField(max_length=200)
    section_number = models.PositiveIntegerField()
    shelf_number = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.closet_name} - Section {self.section_number}, Shelf {self.shelf_number}"

class Hats(models.Model):
    style_name = models.CharField(max_length=200)
    fabric = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    picture_url = models.URLField()

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.style_name} - {self.color}"
