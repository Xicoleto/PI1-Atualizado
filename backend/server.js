const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// 1. IMPORTAR AS ROTAS (Verifique se os caminhos estão corretos)
const solicitacaoRoutes = require('./routes/solicitacaoRoutes');
const requerenteRoutes = require('./routes/requerenteRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');
// const requerenteRoutes = require('./routes/requerenteRoutes'); // Se for usar agora

const app = express();
app.use(cors());
app.use(express.json());

// Teste de conexão com o Banco de Dados (Docker)



// 2. REGISTRAR AS ROTAS
// Agora o Express vai entender que tudo que começa com /api/solicitacoes 
// deve ser tratado pelo arquivo solicitacaoRoutes.js
app.use('/api/solicitacoes', solicitacaoRoutes);
app.use('/api/requerentes', requerenteRoutes);
app.use('/api/movimentacoes', movimentacaoRoutes);

// Rota de teste mantida
app.get('/api/test', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Backend e Banco de Dados (Docker) conectados com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao conectar no banco", error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));