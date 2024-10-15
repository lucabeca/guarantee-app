import React from 'react';
import '../css/about.css';
import ContactForm from '../components/Contact';

function About() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Sobre Nós</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <p className="card-text">
                  Esse sistema surgiu como um projeto de estágio. Somos uma equipe liderada por Luciana Guedes, professora
                  no curso de TADS na UDESC. Nosso objetivo do estágio foi desenvolver uma aplicação web completa para o Programa
                  de Extensão OBI (Olimpíada Brasileira de Informática).
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <p className="card-text">
                  O projeto envolve o desenvolvimento de uma plataforma que permite aos usuários explorar questões das edições
                  passadas da Olimpíada Brasileira de Informática, com filtros por categorias, níveis e tipos de soluções. A justificativa de execução
                  é a não existência atual de um sistema de filtragem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-center">Supervisor</h5>
                <p className="card-text">
                  Prof. Rui Jorge Tramontin Junior
                  <br />
                  Departamento de Ciência da Computação
                  <br />
                  <a href="mailto:rui.tramontin@udesc.br">rui.tramontin@udesc.br</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-center">Orientadora</h5>
                <p className="card-text">
                  Profa. Luciana Rita Guedes
                  <br />
                  Departamento de Ciência da Computação
                  <br />
                  <a href="mailto:luciana.guedes@udesc.br">luciana.guedes@udesc.br</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-center">Estagiário</h5>
                <p className="card-text">
                  Lucas Augusto de Oliveira
                  <br />
                  Curso: TADS, UDESC
                  <br />
                  <a href="mailto:lucas.17aac16@gmail.com">lucas.17aac16@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-center">OBI</h5>
                <p className="card-text">
                  A Olimpíada Brasileira de Informática (OBI) é uma competição acadêmica que visa incentivar o aprendizado de programação e algoritmos entre estudantes do ensino fundamental, médio e universitário.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-center">GPIE</h5>
                <p className="card-text">
                  O Grupo de Pesquisa em Informática na Educação (GPIE) da UDESC é um grupo de estudos voltado para a integração entre tecnologia e processos educativos.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-center">LINE</h5>
                <p className="card-text">
                  O Laboratório de Informática na Educação (LINE) é uma extensão do GPIE, focado na pesquisa e desenvolvimento de novas ferramentas e práticas pedagógicas na área de Ciência da Computação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactForm />
    </>
  );
}

export default About;
