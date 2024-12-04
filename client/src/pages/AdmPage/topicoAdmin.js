import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopicoAdmin() {
  const [clientes, setClientes] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);

  // Função para buscar dados do backend
  const fetchData = async () => {
    try {
      // Buscar clientes
      const clientesResponse = await axios.get('http://localhost:3001/api/clientes');
      setClientes(clientesResponse.data);

      // Buscar solicitações
      const solicitacoesResponse = await axios.get('http://localhost:3001/api/solicitacoes-com-clientes');
      setSolicitacoes(solicitacoesResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar dados.');
    }
  };

  // Chamar fetchData ao carregar o componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Painel Administrativo */}
      <div
        style={{
          backgroundColor: '#000',
          color: '#fff',
          width: '100%',
          textAlign: 'center',
          padding: '10px 0',
          position: 'fixed',
          top: '120px',
          zIndex: 1030,
        }}
      >
        Painel Administrativo
      </div>

      {/* Exibição dos Clientes e Solicitações em formato horizontal */}
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
    </div>
  );
}

// Estilo dos cards
const cardStyle = {
  flex: '1 1 30%', // Faz os cards ocuparem até 30% da largura disponível
  margin: '15px',  // Espaçamento entre os cards
  backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Fundo levemente opaco
  borderRadius: '12px', // Bordas arredondadas
  padding: '20px', // Padding interno para espaçamento
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave para destacar o card
};

// Estilo para as informações dentro do card
const infoContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between', // Espaça os itens horizontalmente
  flexWrap: 'wrap', // Permite que os itens quebrem para a próxima linha, se necessário
  marginBottom: '10px', // Espaçamento entre cada linha de informações
};

// Estilo para cada item dentro do card
const infoItemStyle = {
  flex: '1 1 30%', // Faz cada item ocupar até 30% da largura
  marginRight: '15px', // Espaço entre os itens
  marginBottom: '10px', // Espaçamento entre as linhas
};

export default TopicoAdmin;
