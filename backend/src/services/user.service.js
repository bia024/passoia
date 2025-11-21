import prisma from "../prisma/client.js";

export const createUserService = async (data) => {
  const emailExists = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (emailExists) throw new Error("E-mail já cadastrado.");

  if (data.cpf) {
    const cpfExists = await prisma.user.findUnique({
      where: { cpf: data.cpf },
    });
    if (cpfExists) throw new Error("CPF já cadastrado.");
  }

  if (data.cnpj) {
    const cnpjExists = await prisma.user.findUnique({
      where: { cnpj: data.cnpj },
    });
    if (cnpjExists) throw new Error("CNPJ já cadastrado.");
  }

  const user = await prisma.user.create({ data });
  return user;
};

export const findUserByEmailService = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado.");
  return user;
};

export const listUsersService = async () => {
  return prisma.user.findMany();
};

export const getUserByIdService = async (id) => {
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) throw new Error("Usuário não encontrado.");
  return user;
};

export const updateUserService = async (id, data) => {
  return prisma.user.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteUserService = async (id) => {
  await prisma.user.delete({ where: { id: Number(id) } });
  return { message: "Usuário deletado" };
};
