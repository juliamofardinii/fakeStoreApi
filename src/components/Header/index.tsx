// src/components/Header/index.tsx
import React from "react";
import { Link } from "react-router-dom"; // Importa o Link para navegação

const Header = () => {
  return (
    <header className="bg-[#2A3335] text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Controle de Estoque</h1>
        <nav className="mt-4">
          {/* Links de navegação */}
          <Link to="/" className="text-lg mx-4 hover:text-teal-400">
            Home
          </Link>
          <Link to="/adicionar-produto" className="text-lg mx-4 hover:text-teal-400">
            Adicionar Produto
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

