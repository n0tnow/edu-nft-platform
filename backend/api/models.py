from django.db import models

class User(models.Model):
    wallet_address = models.CharField(max_length=42, unique=True)
    name = models.CharField(max_length=100, blank=True)

class CompletedContent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_title = models.CharField(max_length=200)
    nft_minted = models.BooleanField(default=False)
