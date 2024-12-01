import React from 'react';

function Help() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Ajuda</h1>
            <h5 className="text-center text-muted">Encontre informações úteis sobre o sistema</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Sobre Nós</h5>
                <p className="card-text">
                  A Volantes L.A surgiu em 2020 e, desde então, se tornou referência no comércio de simuladores novos e usados. Buscamos excelência no atendimento e manutenção dos produtos.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Garantia</h5>
                <p className="card-text">
                  Para registrar solicitações de garantia, é necessário informar dados como email, data de compra, número de série e descrever o problema. Lembrando que volantes novos têm garantia diretamente com a Logitech.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Prazos</h5>
                <p className="card-text">
                  Os prazos para análise e resposta das solicitações podem variar de 1 a 3 dias úteis, dependendo da complexidade do caso. Entraremos em contato diretamente pelo email e telefone cadastrados.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Dúvidas</h5>
                <p className="card-text">
                  Caso tenha dúvidas sobre o sistema, garantias ou prazos, entre em contato conosco através do WhatsApp de suporte ou utilize a seção de perguntas frequentes disponível em nossas redes sociais.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-md-6 text-center">
            <h5 className="mb-3">Entre em Contato</h5>
            <div>
              <a
                href="https://wa.me/47984935956"
                className="btn btn-success me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/volantes_la"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
