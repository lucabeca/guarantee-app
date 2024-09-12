import axios from 'axios';

const host = 'http://localhost:3001/api'

async function get(url = '') {
    try {
        const response = await axios.get(`${host}${url}`);
        return response.data;  // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao realizar GET:', error);
        throw error;  // Lança o erro para ser tratado
    }
}

async function post(url = '', data = {}) {
    try {
        const response = await axios.post(`${host}${url}`, data);
        return response.data;  // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao realizar POST:', error);
        throw error;
    }
}


async function put(url = '', data = {}) {
    try {
        const response = await axios.put(`${host}${url}`, data);
        return response.data;  // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao realizar PUT:', error);
        throw error;
    }
}


async function del(url = '') {
    try {
        const response = await axios.delete(`${host}${url}`);
        return response.data;  // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao realizar DELETE:', error);
        throw error;
    }
}

export { get, post, put, del };