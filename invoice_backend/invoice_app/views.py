from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, Http404, HttpResponseBadRequest
from .serializers import UserSerializer, New_InvoiceSerializer
from .data import invoices
import json

users=[]
new_invoice=[]
# Create your views here.

class Invoices(View):
    def get(self,request):
        return JsonResponse(invoices, safe=False)

class New_Invoice(View):
    def post(self,request):
        invoice_data=json.loads(request.body)
        invoice_data["invoice_no"]=len(new_invoice)+1
        print(invoice_data)

        invoice_serialized=New_InvoiceSerializer(data=invoice_data)
        if(invoice_serialized.is_valid()):
            new_invoice.append(invoice_serialized.data)

            return JsonResponse(invoice_serialized.data, safe=False)
        else:
            return JsonResponse(invoice_serialized.errors, safe=False)

class Invoice_detail(View):
    def get(self,request,invoice_no):
        invoice=next((invoice for invoice in invoices if invoice['invoice_no']== invoice_no), None)
        return JsonResponse(invoice,safe=False)

class UserSignup(View):
    def post(self, request):
        user_data=json.loads(request.body)
        user_data["user_id"]=len(users)+1
        user_serialized=UserSerializer(data=user_data)
        if(user_serialized.is_valid()):
            users.append(user_serialized.data)
            return JsonResponse("Registered successfully", safe=False)
        else:
            return JsonResponse(user_serialized.errors, safe=False)

class UserSignin(View):
    def post(self, request):
        user_data=json.loads(request.body)
        print(user_data)
        print(user_data["email_id"])
        for index, item in enumerate(users):
                if(item["email_id"]==user_data["email_id"] and item["password"]==user_data["password"]):
                    return JsonResponse("Login is Successful", safe=False)
        return JsonResponse("Login is not Successful", safe=False)
