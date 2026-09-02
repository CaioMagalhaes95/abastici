# Backend Django - Registrador de Abastecimentos

## Estrutura

```
backend/
├── config/                 # Configurações Django
│   ├── settings.py        # Configurações principais
│   ├── urls.py            # URLs principais
│   └── wsgi.py
├── abastecimento/         # App principal
│   ├── models.py          # Modelo Abastecimento
│   ├── serializers.py     # Serializers DRF
│   ├── views.py           # ViewSets DRF
│   ├── urls.py            # URLs da app
│   ├── admin.py           # Admin customizado
│   └── migrations/
├── manage.py              # CLI Django
├── requirements.txt       # Dependências
└── .env                   # Variáveis de ambiente
```

## Como usar

### 1. Instale as dependências

```bash
pip install -r requirements.txt
```

### 2. Configure o banco de dados no .env

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fuel_registration
DB_USER=postgres
DB_PASSWORD=sua_senha
```

### 3. Execute as migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Execute o servidor

```bash
python manage.py runserver
```

A API estará em: `http://127.0.0.1:8000/api/`

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/abastecimentos/` | Listar todos |
| POST | `/api/abastecimentos/` | Criar novo |
| GET | `/api/abastecimentos/{id}/` | Obter um |
| PUT | `/api/abastecimentos/{id}/` | Atualizar |
| DELETE | `/api/abastecimentos/{id}/` | Deletar |
| GET | `/api/health/` | Health check |

## Admin

Acesse em: `http://127.0.0.1:8000/admin/`

## Usuário Admin

Para criar um superuser:

```bash
python manage.py createsuperuser
```
