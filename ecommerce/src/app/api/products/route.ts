// This file is the route for the products api. It will return all 
// products in the database when a GET request is made 
// and create a new product when a POST request is made.  

import {PrismaClient} from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient(); 

//GET all products
export async function GET(){
    const products = await prisma.product.findMany({orderBy:{price:"asc"}});

    return NextResponse.json({products}, {status:200});
}

//POST a new product
export async function POST(req:NextRequest){
    const body = await req.json();
    const product = await prisma.product.create({data:body});
    return NextResponse.json({product}, {status:201});
}