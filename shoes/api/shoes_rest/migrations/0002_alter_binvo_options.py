# Generated by Django 4.0.3 on 2024-08-08 21:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='binvo',
            options={'ordering': ('closet_name', 'bin_number', 'bin_size')},
        ),
    ]
