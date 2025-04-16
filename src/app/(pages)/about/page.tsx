'use client'

import { Target, Eye } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A233A] py-12 px-6 font-serif">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2d3c5e] mb-4 tracking-wide">NUESTRA HISTORIA</h1>
        <div className="w-24 h-1 bg-[#e67422] mx-auto mb-6"></div>
        <p className="text-xl mb-6 leading-relaxed">
          Desde nuestro humilde comienzo, hemos sido pioneros en traer la auténtica esencia de la cocina asiática a esta ciudad.
          Con pasión y dedicación, cada plato que servimos es un reflejo de las ricas tradiciones culinarias de Asia,
          preparado con ingredientes frescos y de la más alta calidad.
        </p>
        <p className="text-xl mb-8 leading-relaxed">
          En <span className="font-semibold text-[#E07A5F]">ASIAN FOOD</span>, no solo ofrecemos comida; brindamos una experiencia.
          Desde los delicados rollos de sushi hasta el reconfortante ramen y los aromáticos tempuras, cada bocado está diseñado
          para transportar tus sentidos a un viaje culinario inolvidable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer border border-[#D1D5DB]">
            <div className="flex items-center justify-center mb-4 text-[#4A5568]">
              <Target className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-[#E07A5F]">Nuestra Pasión</h2>
            <p className="text-lg text-[#4A5568] leading-relaxed">
              Nuestra misión es deleitar tu paladar con sabores auténticos y vibrantes de la cocina asiática,
              utilizando técnicas tradicionales y presentaciones innovadoras. Queremos que cada comida sea una celebración
              de la cultura y el arte culinario de Asia.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer border border-[#D1D5DB]">
            <div className="flex items-center justify-center mb-4 text-[#4A5568]">
              <Eye className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-[#E07A5F]">Nuestro Compromiso</h2>
            <p className="text-lg text-[#4A5568] leading-relaxed">
              Visualizamos un futuro donde cada cliente pueda experimentar la riqueza y diversidad de la gastronomía asiática
              sin salir de la ciudad. Aspiramos a ser el destino predilecto para aquellos que buscan una experiencia culinaria
              auténtica, memorable y llena de sabor en cada visita o pedido.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Link href="/categories">
            <button className="mt-8 bg-[#e67422] text-white px-8 py-3 rounded font-medium hover:bg-[#d15e0c] transition-all pointer-events-auto">
              DESCUBRI NUESTRO MENU
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}