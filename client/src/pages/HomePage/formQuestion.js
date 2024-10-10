import { Button, Card, CardBody, CardHeader, Container, Row, Col, Form, FormGroup, Input, Label, Collapse } from 'reactstrap';
import Select from 'react-select';

const dificuldadeOptions = [
	{ value: '1', label: 'Fácil' },
	{ value: '2', label: 'Médio' },
	{ value: '3', label: 'Difícil' },
];

export default function FormQuestion({
	anosProvasOptions,
	modalidadeOptions,
	nivelOptions,
	categoriaOptions,
	subcategoriaOptions,
	topicoOptions,
	faseOptions,
	filtros,
	onChangeFiltro,
	searchQuestions,
	clearFilters
}) {
	return (
		<Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm="12">
			<Card>
				<CardHeader>Buscar questões</CardHeader>
				<CardBody>
					<Form>
						<Row>
							<Col md="12">
								<FormGroup>
									<Label for="titulo">Título</Label>
									<Input
										value={filtros.valorTitulo}
										onChange={(event) => {
											onChangeFiltro('valorTitulo', event.target.value);
										}}
										placeholder="Digite o título"
										id="titulo"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="12">
								<FormGroup>
									<Label for="enunciado">Enunciado</Label>
									<Input
										value={filtros.valorEnunciado}
										placeholder="Digite o enunciado"
										id="enunciado"
										onChange={(event) => {
											onChangeFiltro('valorEnunciado', event.target.value);
										}}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="6">
								<FormGroup>
									<Label for="ano">Ano da prova</Label>
									<Select 
										onChange={(vl) => {
											onChangeFiltro('selectedAnoProva', vl.map(({ value }) => value));
										}} 
										isMulti 
										placeholder="Selecione..." 
										options={anosProvasOptions} 
										id="anoprova"
										value={anosProvasOptions.filter(({value}) => (filtros?.selectedAnoProva ?? [])?.includes(value))}
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="nivel">Nível</Label>
									<Select 
										onChange={(vl) => {
											onChangeFiltro('selectedNivel', vl.map(({ value }) => value));
										}} 
										value={nivelOptions.filter(({value}) => (filtros?.selectedNivel ?? [])?.includes(value))}
										isMulti
										placeholder="Selecione..."
										options={nivelOptions}
										id="nivel"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="6">
								<FormGroup>
									<Label for="modalidade">Modalidade</Label>
									<Select
										onChange={(vl) => {
											onChangeFiltro('selectedModalidade', vl.map(({ value }) => value));
										}} 
										isMulti
										placeholder="Selecione..." 
										options={modalidadeOptions} 
										id="modalidade"
										value={modalidadeOptions.filter(({value}) => (filtros?.selectedModalidade ?? [])?.includes(value))
									}
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="fase">Fase</Label>
									<Select 
										onChange={(vl) => {
											onChangeFiltro('selectedFase', vl.map(({ value }) => value));
										}}
										value={faseOptions.filter(({value}) => (filtros?.selectedFase ?? [])?.includes(value))} 
										isMulti 
										placeholder="Selecione..." 
										options={faseOptions} 
										id="fase" 
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="6">
								<FormGroup>
									<Label for="categoria">Categoria</Label>
									<Select 
										onChange={(vl) => {
											onChangeFiltro('selectedCategories', vl.map(({ value }) => value));
										}}
										value={categoriaOptions.filter(({value}) => (filtros?.selectedCategories ?? [])?.includes(value))}
										isMulti
										placeholder="Selecione..." 
										options={categoriaOptions}
										id="categoria"
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="subcategoria">Subcategoria</Label>
									<Select 
										onChange={(vl) => {
											onChangeFiltro('selectedSubCategories', vl.map(({ value }) => value))
										}}
										value={subcategoriaOptions.filter(({value}) => (filtros?.selectedSubCategories ?? [])?.includes(value))}
										isMulti
										placeholder="Selecione..."
										options={subcategoriaOptions}
										id="subcategoria"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="6">
								<FormGroup>
									<Label for="topico">Tópico</Label>
									<Select 
										onChange={(vl) => {
											onChangeFiltro('selectedTopics', vl.map(({ value }) => value));
										}}
										value={topicoOptions.filter(({value}) => (filtros?.selectedTopics ?? [])?.includes(value))}
										isMulti
										placeholder="Selecione..."
										options={topicoOptions}
										id="topico"
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="dificuldade">Dificuldade</Label>
									<Select 
										onChange={(vl) => {
											onChangeFiltro('selectedDificuldade', vl.map(({ value }) => value));
										}} 
										isMulti
										value={dificuldadeOptions.filter(({value}) => (filtros?.selectedDificuldade ?? [])?.includes(value))}
										placeholder="Selecione..." 
										options={dificuldadeOptions} 
										id="dificuldade" 
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="12" className="text-center">
								<Button color="success" onClick={() => searchQuestions()} className="mr-2">Buscar questões</Button>
								<Button color="danger" onClick={() => clearFilters()}>Limpar filtro</Button>
							</Col>
						</Row>
					</Form>
				</CardBody>
			</Card>
		</Col>
	)
}