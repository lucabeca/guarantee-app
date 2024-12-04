import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from 'reactstrap';
import axios from 'axios';

export default function CadastroUsuario() {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
    });

    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar o formato do email
        return regex.test(email);
    };

    const validarTelefone = (telefone) => {
        const regex = /^\d{10,11}$/; // Aceita números com 10 ou 11 dígitos
        return regex.test(telefone);
    };

    const handleCadastro = async () => {
        const { nome, telefone, email } = formData;

        if (!nome || !telefone || !email) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        if (!validarEmail(email)) {
            setErro('Por favor, insira um email válido.');
            return;
        }

        if (!validarTelefone(telefone)) {
            setErro('Por favor, insira um telefone válido (10 ou 11 dígitos).');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/clientes', formData);
            setMensagem(response.data.message || 'Cadastro realizado com sucesso!');
            setErro('');
            setFormData({ nome: '', telefone: '', email: '' }); // Limpa o formulário
        } catch (err) {
            setErro(err.response?.data?.error || 'Erro ao registrar o cliente.');
            setMensagem('');
        }
    };

    return (
        <div className="mt-3">
            <Col md={{ size: 8, offset: 2 }}>
                <Card>
                    <CardBody className="text-center">
                        <p>Ainda não tem cadastro? Registre-se abaixo</p>
                        <div>
                            <Row className="mb-3">
                                <Col md="6">
                                    <Input
                                        type="text"
                                        placeholder="Nome"
                                        value={formData.nome}
                                        onChange={(e) => handleInputChange('nome', e.target.value)}
                                    />
                                </Col>
                                <Col md="6">
                                    <Input
                                        type="text"
                                        placeholder="Telefone"
                                        value={formData.telefone}
                                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md="12">
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Button color="primary" onClick={handleCadastro}>
                                Registrar
                            </Button>
                        </div>

                        {mensagem && <p className="mt-3 text-success">{mensagem}</p>}
                        {erro && <p className="mt-3 text-danger">{erro}</p>}
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}
