// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando o seed do banco de dados...");
  
  console.log("🧹 Limpando dados anteriores...");
  // 1. Limpeza de dados (Lógica baseada no Código 1)
  // A ordem é crucial para evitar erros de chave estrangeira (FK)
  // Apagamos primeiro quem "depende" (Voluntários), depois quem é "dependido" (Eventos)

  // Nota: Assumindo que o nome do model no schema.prisma seja 'volunteer' e 'event'
  // Se der erro aqui, verifique se o model chama 'volunteer' ou 'volunteers' no seu schema
  try {
    await prisma.volunteer.deleteMany();
  } catch (e) {
    // Bloco try/catch caso a tabela volunteer não exista ainda ou tenha outro nome,
    // mas mantendo a lógica de limpeza.
    console.log("Nota: Tabela volunteer vazia ou inexistente.");
  }

  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Criando usuários...");

  // 2. Usuários (Usando create pois o banco foi limpo, igual ao Código 1)
  const admin = await prisma.user.create({
    data: {
      email: "admin@ifrs.edu.br",
      password: "$2b$10$Qe9Syz8nVCGYWO7nJ8JDyesu9pEgZuapHoWf.lfEGq/Jy.iL3ep8G",
      role: "admin",
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "user@ifrs.edu.br",
      password: "$2b$10$A7MRI.2Ov8NfSpBCUQtu3egeKAACVczpSnqh338/OruHjeEzQo5Oy",
      role: "user",
    },
  });

  console.log("✅ Usuários criados:", { admin: admin.email, user: user.email });

  console.log("📅 Criando eventos e voluntários...");

  // 3. Evento com Voluntários aninhados (Nested Write)
  const event = await prisma.event.create({
    data: {
      title: "Semana da Tecnologia",
      description: "Evento de palestras e workshops.",
      date: new Date("2025-10-15"), // Formato ISO
      // Criação aninhada (Relacionamento 1:N)
      volunteers: {
        create: [
          {
            name: "Voluntário Exemplo",
            email: "voluntario@teste.com",
          },
        ],
      },
    },
    // Include para ver o objeto completo no console (igual ao Código 1)
    include: {
      volunteers: true,
    },
  });

  console.log("✅ Evento criado:", event);
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
