// src/pages/Home.tsx
import React from 'react';
import ProductForm from '../../components/CadastroProduto/ProductForm';
import ProductList from '../../components/ProductList';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-gray-800 p-4">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
