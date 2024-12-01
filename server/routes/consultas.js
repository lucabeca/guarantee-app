const express = require('express');
const path = require('path');
const router = express.Router();
const pool = require('../db/db');

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