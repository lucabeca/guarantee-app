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
const emailRouter = require('./routes/email');
app.use('/api', questoesRouter);
app.use('/email', emailRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

