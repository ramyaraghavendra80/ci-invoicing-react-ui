from rest_framework import serializers
from .models import User, Invoices, New_Invoice

class InvoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Invoices
        fields='__all__'

class New_InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model=New_Invoice
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'