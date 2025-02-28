import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

const SearchForm = () => {
  const [codigoQP, setCodigoQP] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigoQP.trim()) {
      navigate(`/tabela/${codigoQP.trim('0')}`);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4 shadow" style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Consulta de Baseline</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Código QP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código QP"
                value={codigoQP}
                onChange={(e) => setCodigoQP(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Exemplo: 007933
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Consultar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SearchForm;
