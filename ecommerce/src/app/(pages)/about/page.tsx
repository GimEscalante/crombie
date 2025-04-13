'use client'

import { MonitorSmartphone, Target, Eye } from 'lucide-react'
import Link from 'next/link'

export default function About() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 text-gray-800 py-12 px-6">
            <section className="max-w-5xl mx-auto text-center">
                <h1 className="text-5xl font-extrabold mb-6 text-blue-700 tracking-tight">Sobre Nosotros</h1>
                <p className="text-xl mb-4 leading-relaxed">
                    Todo comenzó con una idea simple: <span className="font-semibold text-blue-600">hacer que la tecnología de calidad sea accesible para todos</span>.
                    Somos un equipo apasionado por los productos electrónicos, desde periféricos hasta accesorios que mejoran 
                    tu experiencia de trabajo, juego o estudio.
                </p>
                <p className="text-xl mb-8 leading-relaxed">
                    No solo vendemos productos, <span className="font-semibold text-blue-600">ofrecemos soluciones</span>. Cada artículo fue seleccionado y probado para que tengas la mejor experiencia, 
                    con envíos seguros y atención personalizada. Queremos que cada compra <span className="italic">marque la diferencia</span> en tu día a día tecnológico.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-white shadow-xl rounded-2xl p-8 hover:scale-[1.03] transition-transform cursor-pointer border border-blue-100">
                        <div className="flex items-center justify-center mb-4 text-blue-600">
                            <Target className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-blue-600">Nuestra Misión</h2>
                        <p className="text-gray-700 text-lg">
                            Brindar productos electrónicos de alta calidad, accesibles y confiables, 
                            mejorando la experiencia tecnológica de cada cliente.
                        </p>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-8 hover:scale-[1.03] transition-transform cursor-pointer border border-blue-100">
                        <div className="flex items-center justify-center mb-4 text-blue-600">
                            <Eye className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-blue-600">Nuestra Visión</h2>
                        <p className="text-gray-700 text-lg">
                            Ser una tienda líder reconocida por su compromiso con la innovación, 
                            la calidad y la satisfacción del cliente.
                        </p>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <MonitorSmartphone className="w-20 h-20 text-blue-500" />
                </div>
                <div className="mt-10">
                    <Link href="/products">
                        <button className="bg-blue-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                            Explorá nuestros productos
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
