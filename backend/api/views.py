from rest_framework.views import APIView
from rest_framework.response import Response

class UserRegisterView(APIView):
    def post(self, request):
        wallet_address = request.data.get("wallet_address")
        return Response({"message": f"Wallet {wallet_address} registered!"})
