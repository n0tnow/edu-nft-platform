from django.contrib import admin
from django.urls import path
from api.views import UserRegisterView, CompleteContentView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', UserRegisterView.as_view()),
    path('api/content-complete/', CompleteContentView.as_view()),
]
