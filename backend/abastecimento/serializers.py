from rest_framework import serializers
from .models import Abastecimento

class AbastecimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abastecimento
        fields = ['id', 'data', 'combustivel', 'valor', 'litros', 'observacoes', 'criadoEm']
        read_only_fields = ['id', 'criadoEm']
