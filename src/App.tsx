// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index';
import Footer from './components/Footer';
import Header from './components/Header';
import AdicionarProduto from './pages/Cadastro/index'; 

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adicionar-produto" element={<AdicionarProduto />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;




