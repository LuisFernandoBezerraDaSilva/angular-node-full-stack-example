const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const routes = require('./routes/route');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3500; // Porta padrão 3500

app.use(cors());
app.use(express.json());

app.use('/api-luis', routes); // Responde a todas as rotas

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { prisma, server };