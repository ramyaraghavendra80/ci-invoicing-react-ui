from django.urls import path
from .views import UserSignup, UserSignin, Invoices, New_Invoice, Invoice_detail
from django.views.decorators.csrf import csrf_exempt


urlpatterns=[
    path('user/signup/', csrf_exempt(UserSignup.as_view()), name="user_signup"),
    path('user/signin/', csrf_exempt(UserSignin.as_view()), name="user_signin"),
    path('invoices/', csrf_exempt(Invoices.as_view()), name="invoices"),
    path('invoices/<int:invoice_no>/', csrf_exempt(Invoice_detail.as_view()), name="invoices"),
    path('newinvoice/', csrf_exempt(New_Invoice.as_view()), name="new_invoice"),

]