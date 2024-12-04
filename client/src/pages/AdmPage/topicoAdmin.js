import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function TopicoAdmin() {
  const [clientes, setClientes] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  
  // Estado para controlar a exibição do Modal
  const [showModal, setShowModal] = useState(false);
  const [solicitacaoAtual, setSolicitacaoAtual] = useState({});
  const [formData, setFormData] = useState({
    produto: '',
    descricao: '',
    status: ''
  });

  // Função para buscar dados do backend
  const fetchData = async () => {
    try {
      const clientesResponse = await axios.get('http://localhost:3001/api/clientes');
      setClientes(clientesResponse.data);

      const solicitacoesResponse = await axios.get('http://localhost:3001/api/solicitacoes-com-clientes');
      setSolicitacoes(solicitacoesResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar dados.');
    }
  };

  // Função para abrir o modal com os dados da solicitação a ser atualizada
  const handleShowModal = (solicitacao) => {
    setSolicitacaoAtual(solicitacao);
    setFormData({
      produto: solicitacao.produto,
      descricao: solicitacao.descricao,
      status: solicitacao.solicitacao_status // Agora status será editável
    });
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para lidar com mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateSolicitacao = async () => {
    try {
      // Enviando os dados atualizados para o backend
      const response = await axios.put(`http://localhost:3001/api/solicitacoes/${solicitacaoAtual.solicitacao_id}`, {
        produto: formData.produto,
        descricao: formData.descricao,
        status: formData.status
      });
  
      // Atualizando o estado das solicitações com os dados atualizados
      setSolicitacoes((prevSolicitacoes) =>
        prevSolicitacoes.map((solicitacao) =>
          solicitacao.solicitacao_id === solicitacaoAtual.solicitacao_id
            ? { 
                ...solicitacao, 
                produto: formData.produto, 
                descricao: formData.descricao, 
                status: formData.status 
              }
            : solicitacao
        )
      );
  
      // Fechando o modal após a atualização
      setShowModal(false);
      alert('Solicitação atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar solicitação:', error);
      alert('Erro ao atualizar solicitação.');
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container mt-5" style={{ paddingTop: '200px' }}>
        <h3>Clientes Cadastrados</h3>
        <div className="d-flex flex-wrap justify-content-between">
          {clientes.length > 0 ? (
            clientes.map(cliente => (
              <div key={cliente.id} className="card" style={cardStyle}>
                <div className="card-body">
                  <div className="info-container">
                    <div className="info-item">
                      <strong>Nome:</strong>
                      <p>{cliente.nome}</p>
                    </div>
                    <div className="info-item">
                      <strong>Email:</strong>
                      <p>{cliente.email}</p>
                    </div>
                    <div className="info-item">
                      <strong>Telefone:</strong>
                      <p>{cliente.telefone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning" role="alert">
              Nenhum cliente encontrado.
            </div>
          )}
        </div>

        <h3 className="mt-5">Solicitações</h3>
        <div className="d-flex flex-wrap justify-content-between">
          {solicitacoes.length > 0 ? (
            solicitacoes.map(solicitacao => (
              <div key={solicitacao.solicitacao_id} className="card" style={cardStyle}>
                <div className="card-body">
                  <div className="info-container">
                    <div className="info-item">
                      <strong>Produto:</strong>
                      <p>{solicitacao.produto}</p>
                    </div>
                    <div className="info-item">
                      <strong>Descrição:</strong>
                      <p>{solicitacao.descricao}</p>
                    </div>
                    <div className="info-item">
                      <strong>Status:</strong>
                      <p>{solicitacao.solicitacao_status}</p>
                    </div>
                    <div className="info-item">
                      <strong>Cliente:</strong>
                      <p>{solicitacao.cliente_nome}</p>
                    </div>
                    <div className="info-item">
                      <strong>Email do Cliente:</strong>
                      <p>{solicitacao.cliente_email}</p>
                    </div>
                    {/* Botão de Atualizar Solicitação */}
                    <button
                      className="btn btn-warning"
                      onClick={() => handleShowModal(solicitacao)}
                    >
                      Atualizar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning" role="alert">
              Nenhuma solicitação encontrada.
            </div>
          )}
        </div>
      </div>

      {/* Modal para atualização de Solicitação */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Solicitação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="produto">
              <Form.Label>Produto</Form.Label>
              <Form.Control
                type="text"
                name="produto"
                value={formData.produto}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="descricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="Pendente">Pendente</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleUpdateSolicitacao}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// Estilo dos cards
const cardStyle = {
  flex: '1 1 30%',
  margin: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

export default TopicoAdmin;
