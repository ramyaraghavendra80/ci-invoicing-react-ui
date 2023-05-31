from django.db import models

class Invoices(models.Model):
    invoice_no = models.IntegerField()
    client = models.CharField(max_length=250)
    date = models.CharField(max_length=250)
    total_amount = models.DecimalField(max_digits=6, decimal_places=2)

class New_Invoice(models.Model):
    invoice_no = models.IntegerField()
    client = models.CharField(max_length=250)
    bill_date = models.CharField(max_length=250)
    added_items=models.CharField(max_length=250)

class User(models.Model):
    user_id=models.IntegerField(primary_key=True)
    name = models.CharField(max_length=250, unique=True)
    email_id=models.CharField(max_length=250, unique=True)
    password=models.CharField(max_length=100)
