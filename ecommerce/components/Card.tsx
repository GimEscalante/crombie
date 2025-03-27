import Image from 'next/image';
import React from 'react';

interface CardProps{
    title: string;
    description: string;
    price: number;
    image: string;
    children?: React.ReactNode
}

export default function Card({title, description, price, image, children}: CardProps) {
    return (
     
        <div
        className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-52 w-56 hover:shadow-xl bg-white"
        >
        <div
            className="m-2 h-3/6 rounded-lg"
        >
            <Image
            src={image}
            alt={title}
            className="rounded-lg"
            width={100}
            height={100}
            />
        </div>

        <div className="px-5 pt-2 flex flex-col">
            <h2 className="font-semibold">{title}</h2>
            <h3 className="font-semibold">{description}</h3>
            <h3 className="font-semibold">{price}</h3>
            {children}

            <button
            className="bg-blue-500 cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-700"
            type="button"
            >
            Button
            </button>
        </div>
        </div>


    );
}