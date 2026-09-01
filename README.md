# Registrador de Abastecimentos

Um webapp completo para registrar e acompanhar abastecimentos com data, tipo de combustível e valor gasto.

## Tecnologias Utilizadas

### Backend
- **Node.js** com Express.js
- **MongoDB** para persistência de dados
- **Mongoose** para modelagem de dados

### Frontend
- **React** com Hooks
- **Axios** para requisições HTTP
- **CSS3** com gradientes e animações

## Estrutura do Projeto

```
├── backend/
│   ├── server.js          # Servidor Express + Rotas
│   ├── package.json       # Dependências do backend
│   └── .env              # Variáveis de ambiente
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js
    │   ├── App.js
    │   ├── App.css
    │   └── components/
    │       ├── FormAbastecimento.js
    │       ├── FormAbastecimento.css
    │       ├── ListaAbastecimentos.js
    │       ├── ListaAbastecimentos.css
    │       ├── ItemAbastecimento.js
    │       └── ItemAbastecimento.css
    └── package.json
```

## Instalação e Execução

### 1. Instalar MongoDB

**Windows:**
- Baixe em: https://www.mongodb.com/try/download/community
- Instale o MongoDB Community Edition
- Certifique-se de que o serviço está rodando

**Alternativa (MongoDB Atlas - Cloud):**
- Crie uma conta em: https://www.mongodb.com/cloud/atlas
- Substitua `MONGODB_URI` no `.env` pela sua connection string

### 2. Instalar dependências do Backend

```bash
cd backend
npm install
```

### 3. Instalar dependências do Frontend

```bash
cd frontend
npm install
```

### 4. Executar o Backend

```bash
cd backend
npm start
# ou para desenvolvimento com auto-reload
npm run dev
```

O servidor rodará em `http://localhost:5000`

### 5. Executar o Frontend

**Em um novo terminal:**

```bash
cd frontend
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

## Funcionalidades

✅ **Registrar Abastecimento**
- Tipo de combustível (Gasolina, Diesel, Etanol, GNV)
- Valor gasto (input manual obrigatório)
- Quantidade de litros (opcional)
- Observações

✅ **Visualizar Histórico**
- Lista de todos os abastecimentos
- Resumo com totais (gasto total, litros totais, quantidade de registros)
- Formatação de datas e valores

✅ **Deletar Registro**
- Remover abastecimentos do banco de dados

✅ **Persistência em MongoDB**
- Todos os dados são salvos e recuperados do banco

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/abastecimentos` | Listar todos os abastecimentos |
| POST | `/api/abastecimentos` | Criar novo abastecimento |
| GET | `/api/abastecimentos/:id` | Obter abastecimento por ID |
| PUT | `/api/abastecimentos/:id` | Atualizar abastecimento |
| DELETE | `/api/abastecimentos/:id` | Deletar abastecimento |
| GET | `/api/health` | Verificar status da API |

## Exemplo de Requisição POST

```bash
curl -X POST http://localhost:5000/api/abastecimentos \
  -H "Content-Type: application/json" \
  -d '{
    "combustivel": "Gasolina",
    "valor": 150.50,
    "litros": 45.5,
    "observacoes": "Abasteci no posto Ipiranga"
  }'
```

## Variáveis de Ambiente (.env)

```
MONGODB_URI=mongodb://localhost:27017/fuel-registration
PORT=5000
NODE_ENV=development
```

## Troubleshooting

**Erro: "Cannot connect to MongoDB"**
- Verifique se o MongoDB está rodando
- Verifique a `MONGODB_URI` no `.env`

**Erro: CORS error no frontend**
- Certifique-se de que o backend está rodando em `http://localhost:5000`
- Verifique se o proxy no `frontend/package.json` está correto

**Porta já em uso**
- Mude a PORT no `.env` (ex: 5001)
- Para o frontend, execute: `PORT=3001 npm start`

## Desenvolvido com ❤️
