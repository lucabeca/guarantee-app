import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from 'reactstrap';

export default function RegistroGarantia() {
    const [formData, setFormData] = useState({
        email: '',
        dataCompra: '',
        serial: '',
        produto: '',
        descricao: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleRegistro = () => {
        const { email, dataCompra, produto, descricao } = formData;
        if (!email || !dataCompra || !produto || !descricao) {
            alert('Por favor, preencha todos os campos obrigatórios (*) antes de enviar.');
            return;
        }
        alert(`Registro de garantia enviado com sucesso!\nDetalhes: ${JSON.stringify(formData, null, 2)}`);
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
                                        type="text"
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
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}
