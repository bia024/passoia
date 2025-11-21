// src/controllers/produto.controller.js
import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "../services/produto.service.js";

export const getProdutos = async (req, res) => {
  const produtos = await listarProdutos();
  return res.json(produtos);
};

export const getProdutoById = async (req, res) => {
  const produto = await buscarProdutoPorId(req.params.id);
  if (!produto)
    return res.status(404).json({ error: "Produto não encontrado" });
  return res.json(produto);
};

export const createProduto = async (req, res) => {
  const data = req.body;
  const novo = await criarProduto(data);
  return res.status(201).json(novo);
};

export const updateProduto = async (req, res) => {
  const updated = await atualizarProduto(req.params.id, req.body);
  return res.json(updated);
};

export const deleteProduto = async (req, res) => {
  await deletarProduto(req.params.id);
  return res.json({ message: "Produto deletado" });
};
