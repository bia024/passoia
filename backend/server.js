import "dotenv/config";
import app from "./app.js";
import prisma from "./src/prisma/client.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await prisma.$connect();
    console.log("Prisma conectado");
  } catch (e) {
    console.error("Erro conectando Prisma:", e);
  }
});
