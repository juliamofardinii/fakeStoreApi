import React, { useState } from 'react';
import InputText from './InputText'; // Importar os novos componentes
import InputNumber from './InputNumber';
import TextArea from './TextArea';
import { Product } from '../../types/product'; 
import { postProduct, updateProduct } from '../../api/fakeStoreApi';

interface ProductFormProps {
  existingProduct?: Product; // editar produto existente
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct }) => {
  // Estado para os campos do formulário
  const [title, setTitle] = useState(existingProduct?.title || '');
  const [price, setPrice] = useState(existingProduct?.price || 0);
  const [description, setDescription] = useState(existingProduct?.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Definindo o objeto do produto
    const product = { title, price, description, image: '', category: 'electronics' };

    try {
      // Se existe um produto para editar
      if (existingProduct) {
        await updateProduct(existingProduct.id, product);
      } else {
        // Se não, cria um novo produto
        await postProduct(product);
      }

      // Limpar os campos do formulário após o envio
      setTitle('');
      setPrice(0);
      setDescription('');

      alert(existingProduct ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o produto:', error);
      alert('Erro ao enviar o produto.');
    }
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
      <button
        type="submit"
        className="btn p-4 rounded-lg bg-blue-500 text-white w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {existingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
      </button>
    </form>
  );
};

export default ProductForm;
