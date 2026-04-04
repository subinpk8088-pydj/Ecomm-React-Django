from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from products.models import Product

User = settings.AUTH_USER_MODEL

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.product}"