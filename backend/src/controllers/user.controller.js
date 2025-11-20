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

const registerUserSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export async function registerUser(req, res) {
  try {
    const { nome, email, senha } = registerUserSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await createUserService({
      nome,
      email,
      senha: hashedPassword,
    });

    const token = jwt.sign(
      { id: user.id, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(201).json({
      message: "Cadastro realizado com sucesso!",
      token,
      user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Dados inválidos.", details: error.errors });
    }
    return res.status(400).json({ error: error.message });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await listUsersService();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar usuários." });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, senha } = req.body;

    const user = await findUserByEmailService(email);

    const isPasswordCorrect = await bcrypt.compare(senha, user.senha);

    if (!isPasswordCorrect) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      { id: user.id, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      message: "Login bem-sucedido!",
      token,
      user: { nome: user.nome, email: user.email },
    });

  } catch (error) {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await updateUserService(id, data);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    return res.status(204).send();
    } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}
