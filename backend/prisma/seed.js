import bcrypt from "bcrypt";
import prismaModule from "./src/prisma/client.js";

const prisma = prismaModule;

async function main() {
  const hashed = await bcrypt.hash("admin1234", 10);

  await prisma.user.upsert({
    where: { email: "admin@passoia.com" },
    update: {},
    create: {
      tipo: "admin",
      nome: "Admin Passoia",
      email: "admin@passoia.com",
      senha: hashed,
    },
  });

  await prisma.produto.deleteMany({});

  await prisma.produto.createMany({
    data: [
      {
        nome: "Vestido Floral",
        descricao: "Vestido leve",
        preco: 129.9,
        estoque: 10,
        imagemUrl: "",
      },
      {
        nome: "Blusa Basic",
        descricao: "Blusa de algodão",
        preco: 59.9,
        estoque: 20,
        imagemUrl: "",
      },
      {
        id: 1,
        nome: "Kit 3 Batons",
        descricao: "Kit com três cores de batom matte de longa duração.",
        preco: 79.9,
        estoque: 50,
        imagemUrl: "/images/kit3Batons.png",
      },
      {
        id: 2,
        nome: "Batom Líquido (Vermelho, Nude, Rosa)",
        descricao: "Batom líquido com acabamento aveludado e alta pigmentação.",
        preco: 49.9,
        estoque: 80,
        imagemUrl: "/images/kitBatomvermelhoNudeRosa.png",
      },
      {
        id: 3,
        nome: "Kit Gloss Labial",
        descricao: "Kit de gloss com efeito de volume e brilho intenso.",
        preco: 99.9,
        estoque: 40,
        imagemUrl: "/images/kitGloss.png",
      },
      {
        id: 4,
        nome: "Sérum Revitalift Hialurônico",
        descricao: "Sérum preenchedor com 1,5% de ácido hialurônico puro.",
        preco: 106.99,
        estoque: 30,
        imagemUrl: "/images/revitalift-product.jpg",
      },
      {
        id: 5,
        nome: "Absolut Repair Molecular",
        descricao:
          "Tratamento capilar para reparação profunda da fibra do cabelo.",
        preco: 253.9,
        estoque: 25,
        imagemUrl: "/images/Repair Molecular.jpg",
      },
      {
        id: 6,
        nome: "Vitamino Color Spectrum",
        descricao:
          "Shampoo e condicionador para cabelos coloridos, protege a cor e dá brilho.",
        preco: 200.8,
        estoque: 35,
        imagemUrl: "/images/vitamino-color-spectrum.jpg",
      },
      {
        id: 7,
        nome: "Vestido Floral",
        descricao: "Vestido leve de verão com estampa floral.",
        preco: 129.9,
        estoque: 10,
        imagemUrl: "/images/prod-vestido-floral.jpg",
      },
      {
        id: 8,
        nome: "Blusa Basic",
        descricao: "Blusa de algodão orgânico, perfeita para o dia a dia.",
        preco: 59.9,
        estoque: 20,
        imagemUrl: "/images/prod-blusa-basic.jpg",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed executada com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
