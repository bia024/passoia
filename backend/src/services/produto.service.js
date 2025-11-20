import { prisma } from "../prisma/client.js";

export const listProdutosService = async () => {
  return await prisma.produto.findMany();
};

export const getProdutoByIdService = async (id) => {
  const produto = await prisma.produto.findUnique({
    where: { id },
  });

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }
  return produto;
};