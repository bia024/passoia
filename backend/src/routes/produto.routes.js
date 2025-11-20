import { Router } from "express";
import { listProdutos, getProdutoById } from "../controllers/produto.controller.js";

const router = Router();

// Rota para listar todos os produtos
router.get("/", listProdutos);

// ADICIONE ESTA ROTA
router.get("/:id", getProdutoById);

export default router;