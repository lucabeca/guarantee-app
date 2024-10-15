import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Collapse } from 'reactstrap';

export default function CardQuestion({
	item
}) {
	const [isOpen, setIsOpen] = useState(false);

	const { id, titulo, enunciado, ano, fase, modalidade, dificuldade, link } = item;

	const handleDownloadPDF = (questaoId) => {
		// Supondo que o backend está rodando na porta 5000
		const backendUrl = `http://localhost:3001/api/pdf?id=${questaoId}`;
		window.open(backendUrl, '_blank');
	};

	return (
		<Card key={id} className="mb-3 p-4">
			<CardHeader onClick={() => setIsOpen(!isOpen)}>
				<strong>{id}</strong> - {titulo} - {ano} - {fase} - {modalidade} - {dificuldade}
			</CardHeader>
			<Collapse isOpen={isOpen}>
				<CardBody className='d-flex justify-content-between'>
					<div className='w-40'>
						{enunciado}
					</div>
					<div className='w-50 d-flex justify-content-end'>
						<Button className='me-3' onClick={() => {
							window.open(link, "_blank");
						}}>
							Link
						</Button>
						<Button onClick={() => {
							handleDownloadPDF(id)
						}}>
							PDF
						</Button>
					</div>
				</CardBody>
			</Collapse>
		</Card>
	)
}