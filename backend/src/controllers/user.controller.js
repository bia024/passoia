// src/controllers/user.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { z } from "zod";
import {
  createUserService,
  listUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  findUserByEmailService,
} from "../services/user.service.js";

const registerSchema = z
  .object({
    tipo: z.enum(["consumidor", "panelista", "parceiro", "admin"]),
    email: z.string().email(),
    senha: z.string().min(6),

    nome: z.string().optional(),
    cpf: z.string().optional(),

    nomeEmpresa: z.string().optional(),
    cnpj: z.string().optional(),

    cep: z.string().optional(),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.tipo === "consumidor" || data.tipo === "panelista") {
        return !!(data.nome && data.cpf);
      }
      if (data.tipo === "parceiro") {
        return !!(data.nomeEmpresa && data.cnpj);
      }
      return true;
    },
    {
      message: "Campos obrigatórios ausentes para o tipo informado",
    }
  );

export async function registerUser(req, res) {
  try {
    const userData = registerSchema.parse(req.body);

    const hashed = await bcrypt.hash(userData.senha, 10);

    const user = await createUserService({ ...userData, senha: hashed });

    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(201).json({
      message: "Cadastro realizado",
      token,
      user: { id: user.id, email: user.email, tipo: user.tipo },
    });
  } catch (error) {
    if (error instanceof z.ZodError)
      return res
        .status(400)
        .json({ error: "Dados inválidos", details: error.errors });
    return res.status(400).json({ error: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha)
      return res.status(400).json({ error: "Email e senha são obrigatórios" });

    const user = await findUserByEmailService(email);

    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) throw new Error("Credenciais inválidas");

    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      message: "Login ok",
      token,
      user: { id: user.id, email: user.email, tipo: user.tipo },
    });
  } catch (error) {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await listUsersService();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar usuários." });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await getUserByIdService(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const updated = await updateUserService(req.params.id, req.body);
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await deleteUserService(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}
