import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insertar usuarios
  
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "hashedpassword123",
      },
      {
        name: "María López",
        email: "maria@example.com",
        password: "securepassword456",
      },
      {
        name: "Carlos Fernández",
        email: "carlos@example.com",
        password: "strongpass789",
      },
      {
        name: "Ana Gómez",
        email: "ana@example.com",
        password: "password123",
      },
      {
        name: "Pedro Sánchez",
        email: "pedro@example.com",
        password: "safeandsecure2024",
      },
      {
        name: "Lucía Ramírez",
        email: "lucia@example.com",
        password: "mypass456",
      },
      {
        name: "Diego Torres",
        email: "diego@example.com",
        password: "topsecret789",
      },
    ],
  });

  // Crear Categorías
  const categories = await prisma.category.createMany({
    data: [
      { name: "Tecnología" },
      { name: "Moda" },
      { name: "Hogar" },
      { name: "Deportes" },
    ],
  });

  // Obtener las categorías creadas
  const catTecnologia = await prisma.category.findFirst({
    where: { name: "Tecnología" },
  });
  const catModa = await prisma.category.findFirst({ where: { name: "Moda" } });
  const catHogar = await prisma.category.findFirst({
    where: { name: "Hogar" },
  });
  const catDeportes = await prisma.category.findFirst({
    where: { name: "Deportes" },
  });

  if (!catTecnologia || !catModa || !catHogar || !catDeportes) {
    throw new Error("No se pudieron encontrar las categorías.");
  }

  // Crear Productos Asociados a las Categorías
  const products = await prisma.product.createMany({
    data: [
      // Tecnología
      {
        name: "Laptop Gamer",
        description: "Potente laptop con RTX 3080",
        price: 2500,
        categoryId: catTecnologia.categoryId,
      },
      {
        name: "Auriculares Bluetooth",
        description: "Sonido envolvente y cancelación de ruido",
        price: 120,
        categoryId: catTecnologia.categoryId,
      },

      // Moda
      {
        name: "Campera de Cuero",
        description: "Estilo y comodidad para cualquier ocasión",
        price: 300,
        categoryId: catModa.categoryId,
      },
      {
        name: "Zapatillas Urbanas",
        description: "Diseño moderno y suela antideslizante",
        price: 120,
        categoryId: catModa.categoryId,
      },

      // Hogar
      {
        name: "Cafetera Inteligente",
        description: "Prepará tu café con un solo toque",
        price: 200,
        categoryId: catHogar.categoryId,
      },
      {
        name: "Aspiradora Robot",
        description: "Limpieza automática para tu hogar",
        price: 400,
        categoryId: catHogar.categoryId,
      },

      // Deportes
      {
        name: "Bicicleta de Montaña",
        description: "Resistente y perfecta para todo terreno",
        price: 800,
        categoryId: catDeportes.categoryId,
      },
      {
        name: "Pesas Ajustables",
        description: "Entrená con distintos niveles de peso",
        price: 150,
        categoryId: catDeportes.categoryId,
      },
    ],
  });

  console.log("✅ Seed completado con éxito!");
  console.log("Usuarios creados:", users.count);
  console.log("Categorías creadas:", categories.count);
  console.log("Productos creados:", products.count);
  
}

main()
  .catch((e) => {
    console.error("❌ Error al hacer el seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());