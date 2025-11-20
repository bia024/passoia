import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.produto.deleteMany({}); 
  const produtos = [
    {
      id: 'prod-01',
      nome: 'Kit Batons',
      descricao: 'Uma seleção de batons para todas as ocasiões.',
      preco: 79.90,
      imagemUrl: '/src/assets/kit3Batons.png',
      avaliacoes: '/src/assets/avaliacoes.png',
    },
    {
      id: 'prod-02',
      nome: 'Batom Líquido',
      descricao: 'Cor intensa e longa duração com acabamento matte.',
      preco: 49.90,
      imagemUrl: '/src/assets/kitBatomvermelhoNudeRosa.png',
      avaliacoes: '/src/assets/avaliacoes.png',
    },
    {
      id: 'prod-03',
      nome: 'Gloss',
      descricao: 'Brilho espelhado para um look sofisticado.',
      preco: 99.90,
      imagemUrl: '/src/assets/kitGloss.png',
      avaliacoes: '/src/assets/avaliacoes.png',
    },
    {
      id: 'prod-04',
      nome: 'Revitalift',
      descricao: 'Sérum preenchedor com ácido hialurônico.',
      preco: 106.99,
      imagemUrl: '/src/assets/revitalift-product.jpg',
      avaliacoes: '/src/assets/avaliacoes.png',
    },
    {
      id: 'prod-05',
      nome: 'Absolut Repair Molecular',
      descricao: 'Reparação profunda para cabelos danificados.',
      preco: 253.90,
      imagemUrl: '/src/assets/Repair Molecular.jpg',
      avaliacoes: '/src/assets/avaliacoes.png',
    },
    {
      id: 'prod-06',
      nome: 'Vitamino Color Spectrum',
      descricao: 'Máscara profissional para proteção da cor.',
      preco: 200.80,
      imagemUrl: '/src/assets/vitamino-color-spectrum.jpg',
      avaliacoes: '/src/assets/avaliacoes.png',
    }
  ];

  for (const produto of produtos) {
    await prisma.produto.create({ data: produto });
  }

  console.log('Produtos criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });