const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
require('dotenv').config(); // Para usar variáveis de ambiente

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou outro serviço de e-mail como Outlook, etc.
    auth: {
        user: process.env.EMAIL_USER, // Seu e-mail
        pass: process.env.EMAIL_PASS, // Sua senha ou senha de app
    },
});

router.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Enviar para você mesmo
        subject: `Mensagem de Contato - ${name}`,
        text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao enviar o e-mail');
        } else {
            console.log('E-mail enviado: ' + info.response);
            return res.status(200).send('Mensagem enviada com sucesso');
        }
    });
});


module.exports = router;
