import axios from 'axios';
import { Product } from '../types/product';

// Configuração do axios para a API
const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // URL base da API
});

// Função para obter os produtos
export const getProducts = () => api.get('/products?limit=100');

// Função para adicionar um novo produto
export const postProduct = (product: Omit<Product, 'id'>) => api.post('/products', product);

// Função para atualizar um produto existente
export const updateProduct = (id: number, product: Partial<Product>) => api.put(`/products/${id}`, product);

// Função para excluir um produto
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
