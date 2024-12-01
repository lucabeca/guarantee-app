import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from 'reactstrap';

export default function ConsultaManifestacao() {
  const [codigo, setCodigo] = useState('');
  const [consulta, setConsulta] = useState(null); // Armazena os resultados da consulta
  const [erro, setErro] = useState('');

  const handleConsultar = async () => {
    if (codigo.trim()) {
      try {
        // Simulação de chamada ao backend
        const response = await fetch(`/api/consulta/${codigo}`); // Substitua pela URL real
        if (!response.ok) throw new Error('Código não encontrado.');
        
        const data = await response.json();
        setConsulta(data);
        setErro(''); // Limpa mensagens de erro
      } catch (err) {
        setErro(err.message);
        setConsulta(null); // Limpa os resultados anteriores
      }
    } else {
      setErro('Por favor, insira um código.');
      setConsulta(null); // Limpa os resultados anteriores
    }
  };

  return (
    <div className="mt-3">
      <Col md={{ size: 8, offset: 2 }}>
        <Card>
          <CardBody className="text-center">
            <p>Insira o código e acompanhe sua manifestação</p>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <Input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Digite o código"
                style={{ maxWidth: '70%' }}
              />
              <Button color="primary" onClick={handleConsultar}>
                Consultar
              </Button>
            </div>

            {erro && (
              <div className="mt-3 text-danger">
                <strong>{erro}</strong>
              </div>
            )}

            {consulta && (
              <Card className="mt-4">
                <CardBody>
                  <h5 className="text-center">Resultado da Consulta</h5>
                  <Row>
                    <Col md="12">
                      <p><strong>Data de Lançamento:</strong> {consulta.data_lancamento}</p>
                    </Col>
                    <Col md="12">
                      <p><strong>Descrição:</strong> {consulta.descricao}</p>
                    </Col>
                    <Col md="12">
                      <p><strong>Status:</strong> {consulta.status}</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}
