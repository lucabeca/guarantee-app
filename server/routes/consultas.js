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
        s.status AS status,
        s.data_solicitacao,
        s.serial,
        s.nota_fiscal,
        s.data_compra,
        c.id AS cliente_id,
        c.nome AS nome,
        c.telefone AS cliente_telefone,
        c.email AS email
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
  const { produto, descricao, status, serial, nota_fiscal, data_compra } = req.body; // Dados atualizados

  try {
    const result = await pool.query(
      `UPDATE solicitacao
       SET produto = $1, descricao = $2, status = $3, serial = $4, nota_fiscal = $5, data_compra = $6
       WHERE id = $7
       RETURNING *`,
      [produto, descricao, status, serial, nota_fiscal, data_compra, id]
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


// Rota para deletar uma solicitação
router.delete('/solicitacoes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM solicitacao WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    res.status(200).json({ message: 'Solicitação deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar solicitação:', error.message);
    res.status(500).json({ error: 'Erro ao deletar solicitação' });
  }
});

// Adicionando uma solicitação
router.post('/solicitacoes', async (req, res) => {
  const { cliente_id, produto, descricao, status, serial, nota_fiscal, data_compra } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO solicitacao (cliente_id, produto, descricao, status, serial, nota_fiscal, data_compra)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [cliente_id, produto, descricao, status, serial, nota_fiscal, data_compra]
    );

    let novaSolicitacao = result.rows[0];

    // Obter as informações do cliente associado à solicitação
    const clienteResult = await pool.query(
      `SELECT id, nome, email, telefone FROM cliente WHERE id = $1`,
      [cliente_id]
    );
    const cliente = clienteResult.rows[0];

    // Inclui as informações do cliente no objeto de solicitação
    novaSolicitacao = { ...novaSolicitacao, ...cliente };

    res.status(201).json(novaSolicitacao); // Retorna a solicitação com os dados do cliente
  } catch (error) {
    console.error('Erro ao adicionar solicitação:', error.message);
    res.status(500).json({ error: 'Erro ao adicionar solicitação' });
  }
});



module.exports = router;