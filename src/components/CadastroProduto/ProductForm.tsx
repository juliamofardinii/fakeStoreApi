import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const createProductFormSchema = z.object({
  productName: z.string()
    .nonempty('O nome do produto é obrigatório')
    .transform(name => {
      return name
        .split(' ') // Divide a string em palavras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palavra
        .join(' '); // Junta as palavras de volta
    }),

  productQuantity: z.coerce.number()
    .min(1, "A quantidade deve ser pelo menos 1"), 

  productDescription: z.string()
    .nonempty("A descrição é obrigatória") // Garante que não seja vazia
});

type CreateProductFormData = z.infer<typeof createProductFormSchema>; //Cria um tipo de dados chamado CreateProductFormData baseado no esquema de validação createProductFormSchema.

export default function ProductForm() {
  const [products, setProducts] = useState<CreateProductFormData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema)
  });

  // Função para buscar produtos do localStorage  ------
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  function createProduct(data: CreateProductFormData) {
    // Recuperar os produtos existentes do localStorage
    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");

    // Adicionar o novo produto à lista
    const updatedProducts = [...existingProducts, data];

    // Armazenar a lista de produtos no localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Atualizar o estado para refletir na interface
    setProducts(updatedProducts);

    alert("Produto adicionado com sucesso!");

    // Resetar o formulário
    reset();
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cadastro de Produto</h1>
      
      <form onSubmit={handleSubmit(createProduct)} className="space-y-4">
        <div>
          <label>Nome do Produto:</label>
          <input {...register("productName")} className="border p-2 w-full rounded-lg" />
          {errors.productName && <p className="text-red-500 text-left">{errors.productName.message}</p>}
        </div>

        <div>
          <label>Quantidade:</label>
          <input type="number" {...register("productQuantity")} className="border p-2 w-full rounded-lg" />
          {errors.productQuantity && <p className="text-red-500 text-left">{errors.productQuantity.message}</p>}
        </div>

        <div>
          <label>Descrição:</label>
          <textarea {...register("productDescription")} className="border p-2 w-full rounded-lg" />
          {errors.productDescription && <p className="text-red-500 text-left">{errors.productDescription.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}
