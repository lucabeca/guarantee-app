import React, { useState } from 'react';

export default function ContactForm() {
    // Estado para os campos do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(null); // Para feedback de sucesso ou erro

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        setIsSubmitting(true);

        // Dados do formulário
        const formData = {
            name,
            email,
            message
        };

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setName(''); // Limpar o formulário
                setEmail('');
                setMessage('');
            } else {
                setSuccess(false);
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            setSuccess(false);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="card-title text-center">Contato</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Seu nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="nome@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Mensagem</label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows="4"
                                    placeholder="Sua mensagem"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>
                            {success === true && <div className="alert alert-success mt-3">Mensagem enviada com sucesso!</div>}
                            {success === false && <div className="alert alert-danger mt-3">Erro ao enviar mensagem.</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
