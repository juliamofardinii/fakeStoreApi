// src/pages/Detalhes/index.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product';
import { getProductById } from '../api/fakeStoreApi';  // Alteração para usar uma API que busca um único produto

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Pega o ID da URL
  const [produto, setProduto] = useState<Product | null>(null);

  // UseEffect para buscar o produto ao carregar a página
  useEffect(() => {
    const fetchProduto = async () => {
      if (id) {
        const produto = await getProductById(parseInt(id));  // Chama a função para buscar o produto específico
        setProduto(produto || null);  // Atualiza o estado com o produto ou nulo se não encontrado
      }
    };
    fetchProduto();
  }, [id]);

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{produto.title}</h1>
      <img src={produto.image} alt={produto.title} className="w-64 h-64 object-cover mb-4 rounded-md" />
      <p className="text-gray-600">{produto.description}</p>
      <p className="font-semibold">Preço: ${produto.price}</p>
    </div>
  );
};

export default ProductDetails;
