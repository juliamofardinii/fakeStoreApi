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
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-cover mt-4 mb-4"
        />
        <p className="text-1xl">{product.description}</p>
        <p className="text-2xl font-semibold">Preço: ${product.price}</p>
        {/* Outras informações sobre o produto */}
      </div>
    </div>
  );
};

export default ProductDetails;