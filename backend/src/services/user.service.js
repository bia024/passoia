import { prisma } from "../prisma/client.js";

export const createUserService = async (data) => {
  const { name, email } = data;

  const userExists = await prisma.user.findUnique({
    where: { email }
  });

  if (userExists) {
    throw new Error("Email já cadastrado.");
  }

  return await prisma.user.create({ data: { name, email } });
};

export const listUsersService = async () => {
  return await prisma.user.findMany();
};

export const getUserByIdService = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new Error("Usuário não encontrado.");

  return user;
};

export const updateUserService = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data
  });
};

export const deleteUserService = async (id) => {
  await prisma.user.delete({ where: { id } });
};
