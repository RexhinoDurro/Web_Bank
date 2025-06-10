from django.db import models
import uuid
# Create your models here.
class Accounts(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)
  balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
  email = models.EmailField(unique=True)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return f"{self.firstname} {self.lastname} - {self.email}"
  


  