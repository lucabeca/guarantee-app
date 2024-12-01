import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from 'reactstrap';

export default function CadastroUsuario() {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleCadastro = () => {
        const { nome, telefone, email } = formData;
        if (!nome || !telefone || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        alert(`Cadastro realizado com sucesso!\nNome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}`);
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
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}
