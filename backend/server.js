require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

// Modelo de Abastecimento
const Abastecimento = sequelize.define('Abastecimento', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  combustivel: {
    type: DataTypes.ENUM('Gasolina', 'Diesel', 'Etanol', 'GNV'),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  litros: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  observacoes: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'abastecimentos'
});

// Sincronizar banco
sequelize.sync()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.log('Erro ao conectar PostgreSQL:', err));

// Rotas
// GET - Listar todos os abastecimentos
app.get('/api/abastecimentos', async (req, res) => {
  try {
    const abastecimentos = await Abastecimento.findAll({
      order: [['criadoEm', 'DESC']]
    });
    res.json(abastecimentos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// POST - Criar novo abastecimento
app.post('/api/abastecimentos', async (req, res) => {
  try {
    const { combustivel, valor, litros, observacoes } = req.body;

    if (!combustivel || !valor) {
      return res.status(400).json({ erro: 'Combustível e valor são obrigatórios' });
    }

    const abastecimento = await Abastecimento.create({
      combustivel,
      valor,
      litros: litros || null,
      observacoes: observacoes || '',
      data: new Date()
    });

    res.status(201).json(abastecimento);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// GET - Obter um abastecimento por ID
app.get('/api/abastecimentos/:id', async (req, res) => {
  try {
    const abastecimento = await Abastecimento.findByPk(req.params.id);
    if (!abastecimento) {
      return res.status(404).json({ erro: 'Abastecimento não encontrado' });
    }
    res.json(abastecimento);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// PUT - Atualizar um abastecimento
app.put('/api/abastecimentos/:id', async (req, res) => {
  try {
    const { combustivel, valor, litros, observacoes } = req.body;
    const abastecimento = await Abastecimento.findByPk(req.params.id);

    if (!abastecimento) {
      return res.status(404).json({ erro: 'Abastecimento não encontrado' });
    }

    await abastecimento.update({ combustivel, valor, litros, observacoes });
    res.json(abastecimento);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// DELETE - Deletar um abastecimento
app.delete('/api/abastecimentos/:id', async (req, res) => {
  try {
    const abastecimento = await Abastecimento.findByPk(req.params.id);
    if (!abastecimento) {
      return res.status(404).json({ erro: 'Abastecimento não encontrado' });
    }
    await abastecimento.destroy();
    res.json({ mensagem: 'Abastecimento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
