import { Col } from "reactstrap";
import CardQuestion from "./card";

export default function ResultList({
	questoesFiltradas
}) {
	return (
		<Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm="12">
			<h1>Resultados da Pesquisa</h1>
			{/* Adicione aqui a lista de resultados */}
			{questoesFiltradas.map((item) => {
				console.debug('aui');
				return (
					<CardQuestion key={item.id} item={item} />
				);
			})}
		</Col>
	);
}