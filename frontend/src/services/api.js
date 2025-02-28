import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export const getBaselineData = async (codigoQP, page = 0, size = 20) => {
  try {
    const response = await api.get(`/baseline/${codigoQP}`, {
        params: {
            page,
            size
        }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export default api;
