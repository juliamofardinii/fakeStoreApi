import React, { useEffect, useState } from 'react';
import { Product } from '../types/product'; 
import { getProducts, deleteProduct } from '../api/fakeStoreApi';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          {/* Imagem do produto */}
          <img
            src={product.image}
            alt={product.title}
            className="w-32 h-32 object-cover mb-4 rounded-md"
          />
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="font-semibold">Preço: ${product.price}</p>
          <p className="font-semibold">Quantidade: {product.quantity}</p>
          <button
            onClick={() => handleDelete(product.id)}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
