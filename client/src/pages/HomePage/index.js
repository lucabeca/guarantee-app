import { useEffect, useState } from 'react';
import { get } from '../../utils/methods';
import { Container, Row, Col } from 'reactstrap';
import FormQuestion from './formQuestion';
import ResultList from './result';

function HomePage() {

  const [loading, setLoading] = useState(false);
  const [anosProvasOptions, setAnosProvasOptions] = useState([]);
  const [modalidadeOptions, setModalidadeOptions] = useState([]);
  const [nivelOptions, setNivelOptions] = useState([]);
  const [categoriaOptions, setCategoriaOptions] = useState([]);
  const [subcategoriaOptions, setSubcategoriaOptions] = useState([]);
  const [topicoOptions, setTopicoOptions] = useState([]);
  const [faseOptions, setFaseOptions] = useState([]);

  const [selectedAnoProva, setSelectedAnoProva] = useState([]);
  const [selectedModalidade, setSelectedModalidade] = useState([]);
  const [selectedNivel, setSelectedNivel] = useState([]);
  const [selectedDificuldade, setSelectedDificuldade] = useState([]);
  const [selectedFase, setSelectedFase] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [valorTitulo, setValorTitulo] = useState([]);
  const [valorEnunciado, setValorEnunciado] = useState([]);

  const [filtros, setFiltros] = useState({
    selectedAnoProva: [],
    selectedModalidade: [],
    selectedNivel: [],
    selectedDificuldade: [],
    selectedFase: [],
    selectedCategories: [],
    selectedSubCategories: [],
    selectedTopics: [],
    valorTitulo: "",
    valorEnunciado: "",
  });

  const [questoesFiltradas, setQuestoesFiltradas] = useState([]);

  const onChangeFiltro = (campo, valor) => {
    setFiltros(() => {
      return {...filtros, [campo]: valor }
    });
  }

  useEffect(() => {
    get("/subcategoria", {
      categorias: filtros.selectedCategories
    }).then((data) => {
      setSubcategoriaOptions(data);
    })
  }, [filtros.selectedCategories]);

  useEffect(() => {
    get("/topico", {
      subcategorias: filtros.selectedSubCategories
    }).then((data) => {
      setTopicoOptions(data);
    })
  }, [filtros.selectedSubCategories]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      get("/anoProva"),
      get("/modalidade"),
      get("/nivel"),
      get("/categoria"),
      get("/fase"),
    ])
      .then(
        ([
          dataAnoProva,
          dataModalidade,
          dataNivel,
          dataCategoria,
          dataFase,
        ]) => {
          setCategoriaOptions(dataCategoria);
          setAnosProvasOptions(dataAnoProva);
          setModalidadeOptions(dataModalidade);
          setNivelOptions(dataNivel);
          setFaseOptions(dataFase);
          setLoading(false);
        }
      )
      .catch((error) => {
        console.error('Erro ao carregar dados:', error);
        setLoading(false); // Para garantir que o loading seja desativado mesmo em caso de erro
      });
  }, []);

  const searchQuestions = () => {
    get('/getQuestoes', {
      ...filtros,
    }).then((data) => {
      setQuestoesFiltradas(data);
    }).catch((err) => {
      console.error('Erro ao buscar questões:', err);
    });
  }

  const clearFilters = () => {
    setFiltros({
      selectedAnoProva: [],
      selectedModalidade: [],
      selectedNivel: [],
      selectedDificuldade: [],
      selectedFase: [],
      selectedCategories: [],
      selectedSubCategories: [],
      selectedTopics: [],
      valorTitulo: "",
      valorEnunciado: "",
    })
  }

  console.debug('questoes', questoesFiltradas);

  return (
    <>
      <div>
        <Container className="my-5">
          <Row>
            <FormQuestion
              anosProvasOptions={anosProvasOptions}
              modalidadeOptions={modalidadeOptions}
              nivelOptions={nivelOptions}
              categoriaOptions={categoriaOptions}
              subcategoriaOptions={subcategoriaOptions}
              topicoOptions={topicoOptions}
              faseOptions={faseOptions}
              filtros={filtros}
              onChangeFiltro={onChangeFiltro}
              searchQuestions={searchQuestions}
              clearFilters={clearFilters}
            />
          </Row>
          <Row>
            <ResultList questoesFiltradas={questoesFiltradas}/>
          </Row>
        </Container>
      </div>
    </>
  );

}

export default HomePage;
