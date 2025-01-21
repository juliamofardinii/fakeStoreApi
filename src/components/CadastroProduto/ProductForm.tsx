import React, { useState} from 'react';
import InputText from './InputText'; // Importar os novos componentes
import InputNumber from './InputNumber';
import TextArea from './TextArea';
import { Product } from '../../types/product';

interface ProductFormProps {
  existingProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct }) => {
  const [title, setTitle] = useState<string>(() => localStorage.getItem('title') || existingProduct?.title || '');
  const [price, setPrice] = useState<number>(() => Number(localStorage.getItem('price')) || existingProduct?.price || 0);
  const [description, setDescription] = useState<string>(() => localStorage.getItem('description') || existingProduct?.description || '');
  const [image, setImage] = useState<string>(existingProduct?.image || 'default-image-url');

  // Função para recuperar os produtos do localStorage e garantir que seja um array
  const getProductsFromStorage = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  };

  // Função de envio do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Cria um objeto de produto
    const newProduct: Product = {
      title,
      price,
      description,
      image,
      id: new Date().getTime(), // Gera um ID único baseado no timestamp
    };

    // Recupera os produtos existentes no localStorage
    const existingProducts = getProductsFromStorage();

    // Adiciona o novo produto à lista
    const updatedProducts = [...existingProducts, newProduct];

    // Armazena a lista de produtos de volta no localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert('Produto adicionado com sucesso!');

    // Limpar o formulário e localStorage
    /*setTitle('');
    setPrice(0);
    setDescription('');
    setImage('default-image-url');
    setCategory('general');*/
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputText
        value={title}
        onChange={setTitle}
        placeholder="Título"
      />
      <InputNumber
        value={price}
        onChange={setPrice}
        placeholder="Preço"
      />
      <TextArea
        value={description}
        onChange={setDescription}
        placeholder="Descrição"
      />
      <InputText
        value={image}
        onChange={setImage}
        placeholder="URL da Imagem"
      />
      <button
        type="submit"
        className="btn p-4 rounded-lg bg-blue-500 text-white w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Adicionar Produto
      </button>
    </form>
  );
};

export default ProductForm;
