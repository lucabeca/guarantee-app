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
// Atualizar Cliente
router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email } = req.body; // Dados que você quer atualizar

  try {
    const result = await pool.query(
      `UPDATE cliente
       SET nome = $1, telefone = $2, email = $3
       WHERE id = $4
       RETURNING *`,
      [nome, telefone, email, id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Retorna o cliente atualizado
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// Atualizar Solicitação
router.put('/solicitacoes/:id', async (req, res) => {
  const { id } = req.params;
  const { produto, descricao, status } = req.body; // Dados que você quer atualizar

  try {
    const result = await pool.query(
      `UPDATE solicitacao
       SET produto = $1, descricao = $2, status = $3
       WHERE id = $4
       RETURNING *`,
      [produto, descricao, status, id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Retorna a solicitação atualizada
    } else {
      res.status(404).json({ error: 'Solicitação não encontrada' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar solicitação' });
  }
});

module.exports = router;