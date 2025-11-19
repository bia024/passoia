import { prisma } from "../prisma/client.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    // Verificar se o email já existe
    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return res.status(409).json({ error: "E-mail já cadastrado." });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Cadastro realizado com sucesso!",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao criar usuário." });
  }
}
