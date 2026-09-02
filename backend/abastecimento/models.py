import uuid
from django.db import models

class Abastecimento(models.Model):
    COMBUSTIVEL_CHOICES = [
        ('Gasolina', 'Gasolina'),
        ('Diesel', 'Diesel'),
        ('Etanol', 'Etanol'),
        ('GNV', 'GNV'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    data = models.DateTimeField(auto_now_add=True)
    combustivel = models.CharField(max_length=20, choices=COMBUSTIVEL_CHOICES)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    litros = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    observacoes = models.TextField(blank=True, default='')
    criadoEm = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-criadoEm']
        verbose_name = 'Abastecimento'
        verbose_name_plural = 'Abastecimentos'

    def __str__(self):
        return f"{self.combustivel} - R${self.valor} em {self.data.strftime('%d/%m/%Y')}"
