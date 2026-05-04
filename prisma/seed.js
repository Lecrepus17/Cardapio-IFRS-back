// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando o seed do banco de dados...");

  console.log("🧹 Limpando dados anteriores...");
  // Limpeza de dados na ordem correta para evitar erros de FK
  await prisma.menu.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Criando usuários...");

  // Criando usuários
  const admin = await prisma.user.create({
    data: {
      email: "admin@ifrs.edu.br",
      password: "$2b$10$Qe9Syz8nVCGYWO7nJ8JDyesu9pEgZuapHoWf.lfEGq/Jy.iL3ep8G", // Senha hashada para "admin123"
      role: "ADMIN",
    },
  });

  const servidor = await prisma.user.create({
    data: {
      email: "servidor@ifrs.edu.br",
      password: "$2b$10$A7MRI.2Ov8NfSpBCUQtu3egeKAACVczpSnqh338/OruHjeEzQo5Oy", // Senha hashada para "servidor123"
      role: "SERVIDOR",
    },
  });

  const aluno = await prisma.user.create({
    data: {
      email: "aluno@ifrs.edu.br",
      password: "$2b$10$AnotherHashedPasswordHere", // Substitua por hash real
      role: "ALUNO",
    },
  });

  console.log("✅ Usuários criados:", {
    admin: admin.email,
    servidor: servidor.email,
    aluno: aluno.email,
  });

  console.log("🍽️ Criando cardápios...");

  // Definindo datas para 2 semanas de dias úteis (segunda a sexta)
  const startDate = new Date("2026-05-05"); // Segunda-feira
  const menus = [];

  for (let week = 0; week < 2; week++) {
    for (let day = 0; day < 5; day++) {
      // 5 dias úteis por semana
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + week * 7 + day);

      // Café da Manhã
      menus.push({
        type: "CAFEMANHA",
        date: new Date(date),
        items: ["Pão", "Café", "Frutas", "Cereais"],
      });

      // Almoço
      menus.push({
        type: "ALMOCO",
        date: new Date(date),
        items: ["Arroz", "Feijão", "Carne", "Salada", "Suco"],
      });

      // Jantar
      menus.push({
        type: "JANTAR",
        date: new Date(date),
        items: ["Macarrão", "Frango", "Legumes", "Sobremesa"],
      });
    }
  }

  // Criando menus em lote
  for (const menuData of menus) {
    await prisma.menu.create({
      data: menuData,
    });
  }

  console.log(
    `✅ ${menus.length} Cardápios criados para 2 semanas de dias úteis.`,
  );
  console.log("🏁 Seed concluído.");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
