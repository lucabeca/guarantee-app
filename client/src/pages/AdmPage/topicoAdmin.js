import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { format } from 'date-fns';

function TopicoAdmin() {
  const [clientes, setClientes] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  
  // Estado para controlar a exibição do Modal de Atualização e o Modal de Confirmação
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // Estado da solicitação a ser atualizada
  const [solicitacaoAtual, setSolicitacaoAtual] = useState({});
  
  // Dados do formulário para atualização
  const [formData, setFormData] = useState({
    produto: '',
    descricao: '',
    status: ''
  });

  const [showAddSolicitacaoModal, setShowAddSolicitacaoModal] = useState(false);
const [clienteSelecionado, setClienteSelecionado] = useState(null);
const [formDataSolicitacao, setFormDataSolicitacao] = useState({
  produto: '',
  descricao: '',
  status: 'Pendente',
  serial: '',
  nota_fiscal: '',
  data_compra: ''
});

// Função para abrir o modal com o cliente selecionado
const handleShowAddSolicitacaoModal = (clienteId) => {
  setClienteSelecionado(clienteId);
  setShowAddSolicitacaoModal(true);
};

// Função para fechar o modal
const handleCloseAddSolicitacaoModal = () => {
  setShowAddSolicitacaoModal(false);
  setClienteSelecionado(null);  // Limpar cliente selecionado
};

const handleAddSolicitacaoInputChange = (e) => {
  const { name, value } = e.target;
  setFormDataSolicitacao((prevState) => ({
    ...prevState,
    [name]: value
  }));
};

const handleAddSolicitacao = async () => {
  if (!clienteSelecionado) {
    alert('Selecione um cliente');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/api/solicitacoes', {
      cliente_id: clienteSelecionado,
      produto: formDataSolicitacao.produto,
      descricao: formDataSolicitacao.descricao,
      status: formDataSolicitacao.status,
      serial: formDataSolicitacao.serial,
      nota_fiscal: formDataSolicitacao.nota_fiscal,
      data_compra: formDataSolicitacao.data_compra
    });

    // Adiciona a nova solicitação ao estado sem precisar fazer uma nova requisição
    setSolicitacoes((prevSolicitacoes) => [
      ...prevSolicitacoes,
      response.data,
    ]);

    // Fechar o modal e resetar o formulário
    setShowAddSolicitacaoModal(false);
    setFormDataSolicitacao({
      produto: '',
      descricao: '',
      status: 'Pendente',
      serial: '',
      nota_fiscal: '',
      data_compra: ''
    });

    alert('Solicitação adicionada com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar solicitação:', error);
    alert('Erro ao adicionar solicitação.');
  }
};


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

  // Função para abrir o modal de atualização com os dados da solicitação
  const handleShowModal = (solicitacao) => {
    const formattedDate = solicitacao.data_compra 
      ? format(new Date(solicitacao.data_compra), 'yyyy-MM-dd') 
      : '';
    
    setFormData({
      id: solicitacao.solicitacao_id,
      produto: solicitacao.produto,
      descricao: solicitacao.descricao,
      status: solicitacao.status,
      serial: solicitacao.serial || '',
      nota_fiscal: solicitacao.nota_fiscal || '',
      data_compra: formattedDate,
    });
  
    setShowModal(true);
  };
  

  // Função para fechar o modal de atualização
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [solicitacaoToDelete, setSolicitacaoToDelete] = useState(null);

const handleShowDeleteModal = (solicitacaoId) => {
  setSolicitacaoToDelete(solicitacaoId);
  setShowDeleteModal(true);
};

const handleCloseDeleteModal = () => {
  setSolicitacaoToDelete(null);
  setShowDeleteModal(false);
};

const confirmDeleteSolicitacao = async () => {
  if (!solicitacaoToDelete) return;

  try {
    await axios.delete(`http://localhost:3001/api/solicitacoes/${solicitacaoToDelete}`);

    setSolicitacoes((prevSolicitacoes) =>
      prevSolicitacoes.filter((solicitacao) => solicitacao.solicitacao_id !== solicitacaoToDelete)
    );

    alert('Solicitação deletada com sucesso!');
    handleCloseDeleteModal();
  } catch (error) {
    console.error('Erro ao deletar solicitação:', error);
    alert('Erro ao deletar solicitação.');
  }
};


  const handleUpdateSolicitacao = async () => {
    try {
      // Enviando os dados atualizados para o backend
      const response = await axios.put(`http://localhost:3001/api/solicitacoes/${solicitacaoAtual.solicitacao_id}`, {
        produto: formData.produto,
        descricao: formData.descricao,
        status: formData.status
      });
  
      debugger;
      // Atualizando o estado das solicitações com os dados atualizados
      setSolicitacoes((prevSolicitacoes) =>
        prevSolicitacoes.map((solicitacao) =>
          solicitacao.solicitacao_id === solicitacaoAtual.solicitacao_id
            ? { 
                ...solicitacao, 
                produto: formData.produto, 
                descricao: formData.descricao, 
                status: formData.status  // Atualiza o status da solicitação
              }
            : solicitacao
        )
      );
  
      // Fechar o modal de atualização e abrir o modal de confirmação
      setShowModal(false);
      setShowConfirmationModal(true);
    } catch (error) {
      console.error('Erro ao atualizar solicitação:', error);
      alert('Erro ao atualizar solicitação.');
    }
  };
  
  // Função para fechar o modal de confirmação
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container mt-5" style={{ paddingTop: '200px' }}>
        <h3>Clientes Cadastrados</h3>
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
                      <p>{solicitacao.status}</p>
                    </div>
                    <div className="info-item">
                      <strong>Cliente:</strong>
                      <p>{solicitacao.nome}</p>
                    </div>
                    <div className="info-item">
                      <strong>Email do Cliente:</strong>
                      <p>{solicitacao.email}</p>
                    </div>
                    {/* Novos campos */}
                    <div className="info-item">
                      <strong>Serial:</strong>
                      <p>{solicitacao.serial}</p>
                    </div>
                    <div className="info-item">
                      <strong>Nota Fiscal:</strong>
                      <p>{solicitacao.nota_fiscal}</p>
                    </div>
                    <div className="info-item">
                      <strong>Data da Compra:</strong>
                      <p>{new Date(solicitacao.data_compra).toLocaleDateString()}</p>
                    </div>

                    <button
                      className="btn btn-warning"
                      onClick={() => handleShowModal(solicitacao)}
                    >
                      Atualizar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleShowDeleteModal(solicitacao.solicitacao_id)}
                    >
                      Deletar
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

            {/* Novos campos */}
            <Form.Group controlId="serial">
              <Form.Label>Serial</Form.Label>
              <Form.Control
                type="text"
                name="serial"
                value={formData.serial}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="nota_fiscal">
              <Form.Label>Nota Fiscal</Form.Label>
              <Form.Control
                type="text"
                name="nota_fiscal"
                value={formData.nota_fiscal}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="data_compra">
              <Form.Label>Data da Compra</Form.Label>
              <Form.Control
                type="date"
                name="data_compra"
                value={formData.data_compra}
                onChange={handleInputChange}
              />
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


      {/* Modal de Confirmação */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitação Atualizada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A solicitação foi atualizada com sucesso!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar esta solicitação?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteSolicitacao}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Adição de Solicitação */}
<Modal show={showAddSolicitacaoModal} onHide={handleCloseAddSolicitacaoModal}>
  <Modal.Header closeButton>
    <Modal.Title>Adicionar Solicitação</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="produto">
        <Form.Label>Produto</Form.Label>
        <Form.Control
          type="text"
          name="produto"
          value={formDataSolicitacao.produto}
          onChange={handleAddSolicitacaoInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="descricao">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          type="text"
          name="descricao"
          value={formDataSolicitacao.descricao}
          onChange={handleAddSolicitacaoInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={formDataSolicitacao.status}
          onChange={handleAddSolicitacaoInputChange}
          required
        >
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluído">Concluído</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="serial">
        <Form.Label>Serial</Form.Label>
        <Form.Control
          type="text"
          name="serial"
          value={formDataSolicitacao.serial}
          onChange={handleAddSolicitacaoInputChange}
        />
      </Form.Group>

      <Form.Group controlId="nota_fiscal">
        <Form.Label>Nota Fiscal</Form.Label>
        <Form.Control
          type="text"
          name="nota_fiscal"
          value={formDataSolicitacao.nota_fiscal}
          onChange={handleAddSolicitacaoInputChange}
        />
      </Form.Group>

      <Form.Group controlId="data_compra">
        <Form.Label>Data da Compra</Form.Label>
        <Form.Control
          type="date"
          name="data_compra"
          value={formDataSolicitacao.data_compra}
          onChange={handleAddSolicitacaoInputChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseAddSolicitacaoModal}>
      Fechar
    </Button>
    <Button variant="primary" onClick={handleAddSolicitacao}>
      Adicionar
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
}

const cardStyle = {
  flex: '1 1 30%',
  margin: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

export default TopicoAdmin;
