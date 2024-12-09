import React, { useState } from 'react';
import { Product } from '../types/product'; 
import { postProduct, updateProduct } from '../api/fakeStoreApi';

interface ProductFormProps {
    existingProduct?: Product; // editar produto existente
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct }) => {
    // Estado para os campos do formulário
    const [title, setTitle] = useState(existingProduct?.title || '');
    const [price, setPrice] = useState(existingProduct?.price || 0);
    const [description, setDescription] = useState(existingProduct?.description || '');
    const [quantity, setQuantity] = useState(existingProduct?.quantity || 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Definindo o objeto do produto
        const product = { title, price, description, quantity, image: '', category: 'electronics' };

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
            setQuantity(1);

            alert(existingProduct ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
            alert('Erro ao enviar o produto.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                className="input p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Preço"
                className="input p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                className="textarea p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantidade"
                className="input p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
