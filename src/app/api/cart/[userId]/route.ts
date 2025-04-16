// import { NextRequest, NextResponse } from "next/server";
// //import { prisma } from "@/lib/prisma"; 
// import { PrismaClient } from '@prisma/client';


// // VER ERROR: POR QUE NO AGREGA AL CARRITO?!!

//  const prisma = new PrismaClient();

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   const userId = params.userId;
  
//   if (!userId) {
//     return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
//   }

//   const url = new URL(req.url);
//   if (url.pathname.endsWith('/count')) {
//     try {
//       const result = await prisma.cartItem.aggregate({
//         where: { userId },
//         _sum: {
//           quantity: true,
//         },
//       });
  
//       const count = result._sum.quantity || 0;
//       return NextResponse.json({ count });
//     } catch (error) {
//       console.error("Error al obtener el conteo del carrito:", error);
//       return NextResponse.json(
//         { error: "Error al procesar la solicitud" },
//         { status: 500 }
//       );
//     }
//   }

//   try {
//     const cartItems = await prisma.cartItem.findMany({
//       where: { userId },
//       include: {
//         product: {
//           select: {
//             productId: true,
//             name: true,
//             price: true,
//             image: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       items: cartItems,
//     });
//   } catch (error) {
//     console.error("Error al obtener el carrito:", error);
//     return NextResponse.json(
//       { error: "Error al procesar la solicitud" },
//       { status: 500 }
//     );
//   }
// }

// //AGREGAR AL CARRITO: POST
// export async function POST(
//   req: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const { userId } = params;
//     const url = new URL(req.url);
//     if (url.pathname.endsWith('/add')) {
//       try {
//         const body = await req.json();
//         const { productId, quantity } = body;
        
//         if (!productId || !quantity) {
//           return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
//         }
//         const product = await prisma.product.findUnique({
//           where: { productId: productId },
//         });
    
//         if (!product) {
//           return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
//         }
//         const existingCartItem = await prisma.cartItem.findFirst({
//           where: {
//             userId,
//             productId,
//           },
//         });
    
//         if (existingCartItem) {
//           const updatedCartItem = await prisma.cartItem.update({
//             where: { id: existingCartItem.id },
//             data: {
//               quantity: existingCartItem.quantity + quantity,
//             },
//           });
    
//           return NextResponse.json({
//             success: true,
//             message: "Se actualizó la cantidad en el carrito",
//             item: updatedCartItem,
//           });
//         } else {
//           const newCartItem = await prisma.cartItem.create({
//             data: {
//               userId,
//               productId,
//               quantity,
//             },
//           });
    
//           return NextResponse.json({
//             success: true,
//             message: "Producto agregado al carrito",
//             item: newCartItem,
//           });
//         }
//       } catch (error) {
//         console.error("Error al agregar al carrito:", error);
//         return NextResponse.json(
//           { error: "Error al procesar la solicitud" },
//           { status: 500 }
//         );
//       }
//     }

//     return NextResponse.json({ error: "Operación no soportada" }, { status: 400 });
//   } catch (error) {
//     console.error("Error general en la ruta:", error);
//     return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
//   }
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   const userId =  params.userId;
  
//   if (!userId) {
//     return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
//   }

//   try {
//     const { cartItemId, quantity } = await req.json();

//     if (!cartItemId || !quantity || quantity < 1) {
//       return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
//     }

//     const cartItem = await prisma.cartItem.findUnique({
//       where: { id: cartItemId },
//     });

//     if (!cartItem || cartItem.userId !== userId) {
//       return NextResponse.json({ error: "Item no encontrado" }, { status: 404 });
//     }
//     const updatedCartItem = await prisma.cartItem.update({
//       where: { id: cartItemId },
//       data: { quantity },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Cantidad actualizada",
//       item: updatedCartItem,
//     });
//   } catch (error) {
//     console.error("Error al actualizar el carrito:", error);
//     return NextResponse.json(
//       { error: "Error al procesar la solicitud" },
//       { status: 500 }
//     );
//   }
// }

// //ELIMINAR DEL CARRITO: DELETE
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   const userId = params.userId;
  
//   if (!userId) {
//     return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
//   }

//   try {
//     const { cartItemId } = await req.json();

//     if (!cartItemId) {
//       return NextResponse.json({ error: "ID de item requerido" }, { status: 400 });
//     }
//     const cartItem = await prisma.cartItem.findUnique({
//       where: { id: cartItemId },
//     });

//     if (!cartItem || cartItem.userId !== userId) {
//       return NextResponse.json({ error: "Item no encontrado" }, { status: 404 });
//     }
//     await prisma.cartItem.delete({
//       where: { id: cartItemId },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Item eliminado del carrito",
//     });
//   } catch (error) {
//     console.error("Error al eliminar item del carrito:", error);
//     return NextResponse.json(
//       { error: "Error al procesar la solicitud" },
//       { status: 500 }
//     );
//   }
// } 