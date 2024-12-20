import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from 'reactstrap';
import axios from 'axios';
import { formatarData } from '../../utils/formatarData';

export default function ConsultaManifestacao() {
  const [valor, setValor] = useState('');
  const [consultas, setConsultas] = useState([]); // Para armazenar múltiplos resultados
  const [erro, setErro] = useState('');

  const handleConsultar = async () => {
    if (!valor.trim()) {
      setErro('Por favor, insira um código, email ou número de telefone.');
      setConsultas([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/consulta`, {
        params: { valor }, // Envia o valor como parâmetro de consulta
      });

      setConsultas(response.data); // Armazena os resultados
      setErro('');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao consultar.');
      setConsultas([]);
    }
  };

  return (
    <div className="mt-3">
      <Col md={{ size: 8, offset: 2 }}>
        <Card>
          <CardBody className="text-center">
            <p>Insira o código, email ou telefone para acompanhar sua manifestação</p>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <Input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Digite o código, email ou telefone"
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

            {consultas.length > 0 && (
              <Card className="mt-4">
                <CardBody>
                  <h5 className="text-center">Resultados da Consulta</h5>
                  {consultas.map((consulta, index) => (
                    <Row key={index} className="mb-3">
                      <Col md="12">
                        <p><strong>Código:</strong> {consulta.codigo}</p>
                      </Col>
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
                  ))}
                </CardBody>
              </Card>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}
