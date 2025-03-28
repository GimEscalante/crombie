export default function About() {
    return (
        <main className="min-h-screen bg-gray-100 text-gray-800 p-8">
            <section className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-600">About Us</h1>
                <p className="text-lg mb-6">
                    We are passionate about delivering the best products to our customers.
                    Our journey started with a vision to create quality and reliability.
                </p>
                <div className="flex justify-center space-x-4 cursor-pointer">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                        <p>To provide the highest quality products that meet our customers needs.</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
                        <p>To be the leading brand recognized for quality and innovation.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}