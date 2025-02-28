import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import BaselineTable from '../components/BaselineTable';
import { getBaselineData } from '../services/api';

const TablePage = () => {
  const { codigoQP } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Certifique-se de passar os parâmetros corretos para a API
        const result = await getBaselineData(codigoQP, page, pageSize);
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Erro na requisição:", err);
        setError('Erro ao carregar os dados. Verifique se o código QP é válido.');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (codigoQP) {
      fetchData();
    }
  }, [codigoQP, page, pageSize]); // Atualiza quando a página ou tamanho mudar

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(0); // Resetar para a primeira página quando mudar o tamanho
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Baseline - Código QP: {codigoQP}</h2>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Voltar
        </Button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <BaselineTable 
          data={data} 
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          currentPage={page}
          pageSize={pageSize}
        />
      )}
    </Container>
  );
};

export default TablePage;