import { useState } from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';

export default function CardQuestion({
	item
}) {
	const [isOpen, setIsOpen] = useState(false);

	const { id, titulo, enunciado} = item;

	return (
		<Card key={id} className="mb-3 p-4" onClick={() => setIsOpen(!isOpen)}>
			<CardHeader>
				<strong>{id}</strong> - {titulo}
			</CardHeader>
			<Collapse isOpen={isOpen}>
				<CardBody>
					{enunciado}
				</CardBody>
			</Collapse>
		</Card>
	)
}