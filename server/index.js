const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const questoesRouter = require('./routes/consultas');
app.use('/api', questoesRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

