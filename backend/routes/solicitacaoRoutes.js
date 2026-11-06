const express = require('express');
const router = express.Router();
const { Solicitacao, Requerente } = require('../models');

// GET: Listar TODAS as solicitações (Para o Dashboard do Operador)
router.get('/', async (req, res) => {
  try {
    const lista = await Solicitacao.findAll({ include: ['requerente'] });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Consultar TODAS as solicitações de um CPF (tela "Acompanhar" do cidadão) -- antes era por protocolos, alterado para CPF e para lsitar TODAS requisições invés de uma só
router.get('/buscar/:cpf', async (req, res) => {
  try {
    const cpfLimpo = req.params.cpf.replace(/\D/g, '');

    const solicitacoes = await Solicitacao.findAll({
      where: { id_requerente: cpfLimpo },
      order: [['createdAt', 'DESC']],   // da mais recente para a mais antiga
      attributes: ['id', 'numero_protocolo', 'status_atual', 'local_ocorrencia', 'createdAt']
    });

    if (solicitacoes.length === 0) {
      return res.status(404).json({ message: "Nenhuma solicitação encontrada para este CPF" });
    }
    res.json(solicitacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Atualizar STATUS (Para o Operador mudar para 'Em Análise', etc)
router.put('/:id/status', async (req, res) => {
  try {
    const { status_atual } = req.body;
    await Solicitacao.update({ status_atual }, { where: { id: req.params.id } });
    res.json({ message: "Status atualizado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST: Criar nova solicitação
router.post('/', async (req, res) => {
  try {
    const nova = await Solicitacao.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;