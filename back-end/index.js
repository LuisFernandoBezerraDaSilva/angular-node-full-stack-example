const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); // Importar o pacote cors
const routes = require('./routes/route');
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/', routes);

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { prisma, server };