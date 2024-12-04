const express = require('express');
const path = require('path');
const router = express.Router();
const pool = require('../db/db');

router.get('/solicitacoes-com-clientes', async (req, res) => {
  try {
    // Realizando um JOIN entre cliente e solicitacao para trazer as informações completas
    const query = await pool.query(
      `SELECT 
        s.id AS solicitacao_id,
        s.produto,
        s.descricao,
        s.status AS solicitacao_status,
        s.data_solicitacao,
        c.id AS cliente_id,
        c.nome AS cliente_nome,
        c.telefone AS cliente_telefone,
        c.email AS cliente_email
      FROM solicitacao s
      INNER JOIN cliente c ON s.cliente_id = c.id
      ORDER BY s.data_solicitacao DESC`
    );

    // Retorna as linhas com as informações combinadas
    res.json(query.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao consultar solicitações com dados de clientes' });
  }
});

router.get('/clientes', async (req, res) => {
  try {
    const query = await pool.query(
      `SELECT id, nome, telefone, email FROM cliente ORDER BY nome ASC`
    );
    res.json(query.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao consultar clientes' });
  }
});

router.get('/consulta/:codigo', async (req, res) => {
  const { codigo } = req.params; // Obtém o parâmetro da URL

  try {
    // Consulta dinâmica ao banco de dados
    const query = await pool.query(
      `
      SELECT 
        id AS codigo, 
        data_compra AS data_lancamento, 
        descricao, 
        status 
      FROM solicitacao
      WHERE id = $1
      `,
      [codigo]
    );

    // Verifica se o registro foi encontrado
    if (query.rows.length === 0) {
      return res.status(404).json({ error: 'Manifestação não encontrada.' });
    }

    res.json(query.rows[0]); // Retorna o primeiro registro encontrado
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao consultar manifestação.' });
  }
});

module.exports = router;