import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/fakeStoreApi';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const response = await getProductById(Number(id));
        setProduct(response);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center w-full">
        {/* Imagem do produto à esquerda com espaço à direita */}
        <img
          src={product.image}
          alt={product.title}
          className="w-96 h-96 object-cover mb-4 md:mb-0 md:mr-10" // Espaço à direita da imagem
        />
        
        <div className="flex flex-col items-center md:items-start"> {/* Centralizando os itens */}
          {/* Título do produto */}
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">{product.title}</h2>
          
          {/* Descrição abaixo do título */}
          <p className="text-lg mb-4 text-center md:text-left">{product.description}</p>
          
          {/* Preço abaixo da descrição */}
          <p className="text-2xl font-semibold text-center md:text-left">${product.price}</p>
          
          {/* Botões abaixo da descrição */}
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
