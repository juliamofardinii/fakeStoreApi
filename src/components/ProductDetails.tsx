import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Importar hook useParams
import { getProductById } from '../api/fakeStoreApi';  // Função para buscar o produto pelo ID

const ProductDetails: React.FC = () => {
  const { id } = useParams();  // Pega o id da URL
  const [product, setProduct] = useState<any>(null);  // Estado para armazenar o produto

  // Buscar o produto com base no id
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const response = await getProductById(Number(id));  // Chama a API passando o id
        setProduct(response);  // Atualiza o estado com os dados do produto
      }
    };
    fetchProduct();
  }, [id]);  // Quando o id mudar, refaz a busca

  // Se o produto não estiver carregado, exibe "Carregando..."
  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-cover mt-4 mb-4"
        />
        <p>{product.description}</p>
        <p className="font-semibold">Preço: ${product.price}</p>
        {/* Você pode adicionar mais informações, como categorias ou outros detalhes */}
        <div className="mt-6">
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
