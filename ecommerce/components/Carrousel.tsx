export default function Carrousel(){
    return(
        <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full h-screen">
            <img
              src="/images/woman-chosing-white-shirt.jpg"
              alt="slide 1"
              className="w-full h-screen object-cover" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>

        </div>
      </main>
    </div>
    )
}