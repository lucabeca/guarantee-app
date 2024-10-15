const express = require('express');
const path = require('path');
const router = express.Router();
const pool = require('../db/db');
const { getQuestoes } = require('../controllers/questoes.controller');

const externalPdfDir = path.join('../arquivos-pdf');

router.get('/questoes', getQuestoes);

router.get('/anoProva', async (req, res) => {
  try {
    const query = await pool.query(
      `
      select 
        distinct extract(year from p.ano) as value,
        extract(year from p.ano) as label
      from provas p
      order by 1 desc
      `
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/modalidade', async (req, res) => {
  try {
    const query = await pool.query(
      `
      SELECT 
	      distinct id as value,
	      nome as label
		  FROM modalidades
      ORDER BY 1
      `
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/nivel', async (req, res) => {
  try {
    const query = await pool.query(
      `
      SELECT 
	      distinct id as value,
	      nome as label
		  FROM niveis
      ORDER BY 1
      `
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/fase', async (req, res) => {
  try {
    const query = await pool.query(
      `
      select 
        distinct fase as value,
        fase as label
      from provas p
      order by 1 desc
      `
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});


router.get('/categoria', async (req, res) => {
  try {
    const query = await pool.query(
      `
      select 
        distinct id as value,
        nome as label
      from categorias
      order by 1 desc
      `
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/subcategoria', async (req, res) => {
  try {

    const { categorias } = req.query;

    const categoriasCerta = categorias ?? null;

    const query = await pool.query(
      `
      select 
        distinct s.id as value,
          s.nome as label
      from subcategorias s 
      where s.categoria_id = any($1::int[]) or $1 is null
      order by 1
      `, [categoriasCerta]
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});


router.get('/topico', async (req, res) => {
  try {

    const { subcategorias } = req.query;

    const subCategoriasCerta = subcategorias ?? null;

    const query = await pool.query(
      `
      select 
        distinct t.id as value,
          t.nome as label
      from topicos t 
      where t.subcategoria_id = any($1::int[]) or $1 is null
      order by 1
      `, [subCategoriasCerta]
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/getQuestoes', async (req, res) => {
  try {

    const {
      selectedAnoProva,
      selectedModalidade,
      selectedNivel,
      selectedDificuldade,
      selectedFase,
      selectedCategories,
      selectedSubCategories,
      selectedTopics,
      valorTitulo,
      valorEnunciado
    } = req.query;

    const query = await pool.query(
      `
      select
        q.id,
        q.titulo,
        q.enunciado,
        extract(year from p.ano) as ano,
        d.nivel as dificuldade,
        p.fase,
        m.nome as modalidade,
        q.linkobi as link
      from questoes q
        join provas p on p.id = q.prova_id 
          and (extract(year from p.ano) = any($2::int[]) or $2 is null)
          and (p.fase = any($4::text[]) or $4 is null)
          and (p.modalidade_id = any($3::int[]) or $3 is null)
        join modalidade_niveis mn on mn.modalidade_id = p.modalidade_id
          and (mn.nivel_id = any($10::int[]) or $10 is null)
        join modalidades m on mn.modalidade_id = m.id
        join niveis n on mn.nivel_id = n.id
        join questoes_topicos qt on qt.questao_id = q.id
        join topicos t on t.id = qt.topico_id
        join subcategorias s on s.id = t.subcategoria_id
        join categorias c on c.id = s.categoria_id
        join dificuldades d on d.id = q.dificuldade_id
      where (q.dificuldade_id = any($1::int[]) or $1 is null)
        and (q.titulo like '%' || $5 || '%' or $5 is null)
        and (q.enunciado like '%' || $6 || '%' or $6 is null)
        and (t.id = any($7::int[]) or $7 is null)
        and (s.id = any($8::int[]) or $8 is null)
        and (c.id = any($9::int[]) or $9 is null)
      group by q.id, p.id, d.id, m.id
      order by 1

    `, [
      selectedDificuldade,
      selectedAnoProva,
      selectedModalidade,
      selectedFase,
      valorTitulo,
      valorEnunciado,
      selectedTopics,
      selectedSubCategories,
      selectedCategories,
      selectedNivel
    ]
    );
    const questoes = query.rows;
    res.json(questoes);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/pdf', async (req, res) => {
  const { id: questaoId } = req.query;
  const query = await pool.query(
    `
    select
      q.arquivo
    from questoes q 
    where q.id = $1
    `, 
    [questaoId]
  );
  const arquivo = query.rows[0].arquivo;
  const filePath = path.join(__dirname, '..', '..', '..', arquivo); // Substitua pelo caminho real do seu arquivo;
  res.sendFile(filePath);
});


router.get('/dificuldade', async (req, res) => {
  try {
    const query = await pool.query(
      `
      select 
        distinct id as value,
        nivel as label
      from dificuldades
      order by 1 desc
      `
    );
    const ret = query.rows;
    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;