from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Abastecimento
from .serializers import AbastecimentoSerializer

class AbastecimentoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar abastecimentos.
    
    Permite:
    - GET /api/abastecimentos/ - Listar todos
    - POST /api/abastecimentos/ - Criar novo
    - GET /api/abastecimentos/{id}/ - Obter um
    - PUT /api/abastecimentos/{id}/ - Atualizar
    - DELETE /api/abastecimentos/{id}/ - Deletar
    """
    queryset = Abastecimento.objects.all().order_by('-criadoEm')
    serializer_class = AbastecimentoSerializer

@api_view(['GET'])
def health_check(request):
    """Health check da API"""
    return Response({'status': 'API funcionando'})
