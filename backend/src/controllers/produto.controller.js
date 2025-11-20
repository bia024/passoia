import { listProdutosService, getProdutoByIdService } from "../services/produto.service.js";

export async function listProdutos(req, res) {
  try {
    const produtos = await listProdutosService();
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar produtos." });
  }
}

// ADICIONE ESTE CONTROLLER
export async function getProdutoById(req, res) {
  try {
    const { id } = req.params;
    const produto = await getProdutoByIdService(id);
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}