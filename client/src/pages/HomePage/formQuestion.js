import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from 'reactstrap';
import axios from 'axios';
import {formatarData} from '../../utils/formatarData';

export default function ConsultaManifestacao() {
  const [codigo, setCodigo] = useState('');
  const [consulta, setConsulta] = useState(null);
  const [erro, setErro] = useState('');

  const handleConsultar = async () => {
    if (!codigo.trim()) {
      setErro('Por favor, insira um código.');
      setConsulta(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/consulta/${codigo}`);
      setConsulta(response.data);
      setErro('');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao consultar o código.');
      setConsulta(null);
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
                      <p><strong>Data de Lançamento:</strong> {formatarData(consulta.data_lancamento)}</p>
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
