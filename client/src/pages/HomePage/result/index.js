import { Col } from "reactstrap";
import CardQuestion from "./card";

export default function ResultList({ questoesFiltradas }) {
	return (
		<Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm="12">
			<h3 className="mt-3">Resultados da Pesquisa</h3>
			{/* Adicione aqui a lista de resultados */}
			{
				questoesFiltradas.length === 0 ? (
					<div>Não há retorno de dados</div>
				) : (
					questoesFiltradas.map((item) => {
						console.debug('aui');
						return (
							<CardQuestion key={item.id} item={item} />
						);
					})
				)
			}
		</Col>
	);
}
