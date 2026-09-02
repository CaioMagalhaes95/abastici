from django.contrib import admin
from .models import Abastecimento

@admin.register(Abastecimento)
class AbastecimentoAdmin(admin.ModelAdmin):
    list_display = ('combustivel', 'valor', 'litros', 'data', 'criadoEm')
    list_filter = ('combustivel', 'data', 'criadoEm')
    search_fields = ('observacoes',)
    ordering = ('-criadoEm',)
    readonly_fields = ('id', 'criadoEm')
