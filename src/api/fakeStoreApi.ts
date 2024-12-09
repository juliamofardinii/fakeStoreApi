import axios from 'axios';
import { Product } from '../types/product';

const BASE_URL = 'https://fakestoreapi.com';

// Função para buscar produtos
export const getProducts = async (): Promise<{ data: Product[] }> => {
  try {
    const response = await axios.get<Product[]>(`${BASE_URL}/products?limit=100`);
    return { data: response.data }; // Retornando como um objeto com a propriedade 'data'
  } catch (error) {
    throw new Error('Erro ao buscar produtos');
  }
};

// Outras funções
export const postProduct = async (product: Omit<Product, 'id'>) => {
  return await axios.post(`${BASE_URL}/products`, product);
};

export const updateProduct = async (id: number, product: Partial<Product>) => {
  return await axios.put(`${BASE_URL}/products/${id}`, product);
};

export const deleteProduct = async (id: number) => {
  return await axios.delete(`${BASE_URL}/products/${id}`);
};

