import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from 'reactstrap';
import axios from 'axios';

export default function RegistroGarantia() {
    const [formData, setFormData] = useState({
        email: '',
        dataCompra: '',
        serial: '',
        produto: '',
        descricao: '',
    });

    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleRegistro = async () => {
        const { email, dataCompra, serial, produto, descricao } = formData;
    
        if (!email || !dataCompra || !serial || !produto || !descricao) {
            setErro('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3001/api/solicitacoes', formData);
            setMensagem(
                `Registro realizado com sucesso! Código de consulta: ${response.data.codigoConsulta}`
            );
            setErro('');
            setFormData({ email: '', dataCompra: '', serial: '', produto: '', descricao: '' }); // Limpa o formulário
        } catch (err) {
            setErro(err.response?.data?.error || 'Erro ao registrar garantia.');
            setMensagem('');
        }
    };
    
    return (
        <div className="mt-3">
            <Col md={{ size: 8, offset: 2 }}>
                <Card>
                    <CardBody className="text-center">
                        <p>Registre sua manifestação de garantia</p>
                        <div>
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
                            <Row className="mb-3">
                                <Col md="6">
                                    <Input
                                        type="date"
                                        placeholder="Data de Compra"
                                        value={formData.dataCompra}
                                        onChange={(e) => handleInputChange('dataCompra', e.target.value)}
                                    />
                                </Col>
                                <Col md="6">
                                    <Input
                                        type="text"
                                        placeholder="Serial"
                                        value={formData.serial}
                                        onChange={(e) => handleInputChange('serial', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md="6">
                                    <Input
                                        type="text"
                                        placeholder="Produto"
                                        value={formData.produto}
                                        onChange={(e) => handleInputChange('produto', e.target.value)}
                                    />
                                </Col>
                                <Col md="6">
                                    <Input
                                        type="textarea"
                                        placeholder="Descrição"
                                        value={formData.descricao}
                                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Button color="primary" onClick={handleRegistro}>
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
