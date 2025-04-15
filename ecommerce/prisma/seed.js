import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  
  // Borrar datos anteriores
  await prisma.cartitem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Insertar usuarios
  const users = await prisma.user.createMany({
    data: [
      {
        clerkId: "clerk_juan",
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "hashedpassword123",
      },
      {
        clerkId: "clerk_maria",
        name: "María López",
        email: "maria@example.com",
        password: "securepassword456",
      },
      {
        clerkId: "clerk_carlos",
        name: "Carlos Fernández",
        email: "carlos@example.com",
        password: "strongpass789",
      },
      {
        clerkId: "clerk_ana",
        name: "Ana Gómez",
        email: "ana@example.com",
        password: "password123",
      },
      {
        clerkId: "clerk_pedro",
        name: "Pedro Sánchez",
        email: "pedro@example.com",
        password: "safeandsecure2024",
      },
      {
        clerkId: "clerk_lucia",
        name: "Lucía Ramírez",
        email: "lucia@example.com",
        password: "mypass456",
      },
      {
        clerkId: "clerk_diego",
        name: "Diego Torres",
        email: "diego@example.com",
        password: "topsecret789",
      },
    ],
    skipDuplicates: true,
  });

  const categories = await prisma.category.createMany({
    data: [
      {  name: "Comida Japonesa" },
      {  name: "Comida Coreana" },
      {  name: "Comida China" },
      {  name: "Comida Tailandesa" },
    ],
  });

  // Obtener las categorías por nombre
  const [japonesa, coreana, china, tailandesa] = await Promise.all([
    prisma.category.findFirst({ where: { name: "Comida Japonesa" } }),
    prisma.category.findFirst({ where: { name: "Comida Coreana" } }),
    prisma.category.findFirst({ where: { name: "Comida China" } }),
    prisma.category.findFirst({ where: { name: "Comida Tailandesa" } }),
  ]);

  if (!japonesa || !coreana || !china || !tailandesa) {
    throw new Error("No se pudieron encontrar las categorías.");
  }

 

  // Crear Productos Asociados a las Categorías
  const products = await prisma.product.createMany({
    data: [
      // --- Japón
  {
    name: "Sushi Variado",
    description: "Selección de sushi con salmón, atún y palta.",
    price: 2500,
    categoryId: japonesa.categoryId,
    image: "/images/sushi.jpg",
  },
  {
    name: "Ramen de Cerdo",
    description: "Ramen con caldo miso, cerdo marinado y huevo.",
    price: 3000,
    categoryId: japonesa.categoryId,
    image: "/images/ramen.jpg",
  },
  {
    name: "Tempura de Langostinos",
    description: "Langostinos rebozados con salsa especial.",
    price: 2200,
    categoryId: japonesa.categoryId,
    image: "/images/tempura.jpg",
  },
  {
    name: "Takoyaki",
    description: "Bolas de masa rellenas de pulpo, típicas de Osaka.",
    price: 2000,
    categoryId: japonesa.categoryId,
    image: "/images/takoyaki.jpg",
  },
  {
    name: "Katsu Curry",
    description: "Cerdo empanado con arroz y curry japonés.",
    price: 2800,
    categoryId: japonesa.categoryId,
    image: "/images/katsu-curry.jpg",
  },

  // --- Corea
  {
    name: "Kimchi",
    description: "Repollo fermentado picante, tradicional coreano.",
    price: 1200,
    categoryId: coreana.categoryId,
    image: "/images/kimchi.jpg",
  },
  {
    name: "Bibimbap",
    description: "Arroz con carne, vegetales, huevo y salsa picante.",
    price: 2700,
    categoryId: coreana.categoryId,
    image: "/images/bibimbap.jpg",
  },
  {
    name: "Tteokbokki",
    description: "Pastel de arroz picante con salsa gochujang.",
    price: 2000,
    categoryId: coreana.categoryId,
    image: "/images/tteokbokki.jpg",
  },
  {
    name: "Japchae",
    description: "Fideos de batata salteados con vegetales y carne.",
    price: 2500,
    categoryId: coreana.categoryId,
    image: "/images/japchae.jpg",
  },
  {
    name: "Sundubu-jjigae",
    description: "Estofado de tofu suave con mariscos o carne.",
    price: 2600,
    categoryId: coreana.categoryId,
    image: "/images/sundubu.jpg",
  },

  // --- China
  {
    name: "Pollo Agridulce",
    description: "Clásico pollo chino con salsa agridulce y piña.",
    price: 2600,
    categoryId: china.categoryId,
    image: "/images/pollo-agridulce.jpg",
  },
  {
    name: "Arroz Frito",
    description: "Arroz salteado con vegetales y huevo.",
    price: 1900,
    categoryId: china.categoryId,
    image: "/images/arroz-frito.jpg",
  },
  {
    name: "Chow Mein",
    description: "Fideos salteados con verduras y pollo.",
    price: 2100,
    categoryId: china.categoryId,
    image: "/images/chow-mein.jpg",
  },
  {
    name: "Dumplings al Vapor",
    description: "Empanaditas rellenas de cerdo y verduras.",
    price: 2200,
    categoryId: china.categoryId,
    image: "/images/dumplings.jpg",
  },
  {
    name: "Sopa Wantán",
    description: "Sopa ligera con wantanes rellenos y cebollín.",
    price: 1800,
    categoryId: china.categoryId,
    image: "/images/wantan.jpg",
  },

  // --- Tailandia
  {
    name: "Pad Thai",
    description: "Fideos de arroz salteados con tamarindo, maní y tofu.",
    price: 2800,
    categoryId: tailandesa.categoryId,
    image: "/images/pad-thai.jpg",
  },
  {
    name: "Satay de Pollo",
    description: "Brochetas de pollo marinado, servidas con salsa de maní.",
    price: 2900,
    categoryId: tailandesa.categoryId,
    image: "/images/satay.jpg",
  },
  {
    name: "Larb",
    description: "Ensalada picante de carne molida con hierbas frescas y lima.",
    price: 2600,
    categoryId: tailandesa.categoryId,
    image: "/images/larb.jpg",
  },
  {
    name: "Sticky Rice con Mango",
    description: "Arroz glutinoso con leche de coco y mango fresco.",
    price: 2400,
    categoryId: tailandesa.categoryId,
    image: "/images/sticky-mango.jpg",
  },
],
})

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