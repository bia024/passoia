import prisma from "../prisma/client.js";

export const listarProdutos = async () => prisma.produto.findMany();

export const buscarProdutoPorId = async (id) =>
  prisma.produto.findUnique({ where: { id: Number(id) } });

export const criarProduto = async (data) => prisma.produto.create({ data });

export const atualizarProduto = async (id, data) =>
  prisma.produto.update({ where: { id: Number(id) }, data });

export const deletarProduto = async (id) =>
  prisma.produto.delete({ where: { id: Number(id) } });
