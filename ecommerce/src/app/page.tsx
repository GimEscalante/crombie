import Carrousel from "../../components/Carrousel";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      {/* Carrousel */}
      <Carrousel />

      {/* Sección en construcción */}
      <section className="flex flex-col items-center justify-center py-20 bg-gray-200 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          ¡Estamos trabajando en la mejora de nuestra tienda!
        </h2>
        <p className="text-lg text-gray-600 mb-6 text-center">
          La página está en construcción para ofrecerte una mejor experiencia. 
          Estamos trabajando para que puedas disfrutar de nuestros productos de manera óptima.
        </p>
        <div className="text-6xl text-yellow-500 mb-4">
          <Image
                src="/images/construccion.png" 
                alt="icono-construccion"
                width={200}
                height={200}
          />
        </div>
        <p className="text-lg text-gray-500 text-center">
          ¡Gracias por tu paciencia y comprensión!
        </p>
      </section>
    </main>
  );
}
