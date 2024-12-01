import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Consulta from './formQuestion';
import Cadastro from './cadastro';
import Garantia from './garantia';

function HomePage() {

  return (
    <>
      <div>
        <Container className="my-5">
          <Row>
            <Consulta/>
          </Row>
          <Row>
            <Cadastro/>
          </Row>
          <Row>
            <Garantia/>
          </Row>
        </Container>
      </div>
    </>
  );

}

export default HomePage;
