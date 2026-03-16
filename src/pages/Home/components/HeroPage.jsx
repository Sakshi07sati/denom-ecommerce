import { useState, useEffect,useCallback } from 'react';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

const HeroPage = () => {
  useScrollToTop();

  const slides = [
    {
      id: 1,
      image: "https://i.pinimg.com/1200x/02/53/15/02531522cd559a88a78bcf7a8682faf7.jpg",
      title: "Retro Glamour Finds",
      subtitle: "Curated Vintage Fashion for You"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/bd/d5/2b/bdd52b684652b86d32d535e50e5643cb.jpg",
      title: "Timeless Elegance",
      subtitle: "Classic Silhouettes for the Modern Woman"
    },
    {
      id: 3,
      image: "https://i.pinimg.com/1200x/25/c1/ea/25c1ea3d44ba8df0115adf4ca33144e9.jpg",
      title: "Groceries with a Twist",
      subtitle: "Healthy, Unique & Delicious Finds for Your Pantry"
    },
    {
      id: 4,
      image: "https://i.pinimg.com/736x/21/f9/ea/21f9ea6000fad9961ae9cfa192627bf9.jpg",
      title: "The Summer Archive",
      subtitle: "Cherry Blossoms & Sun-Kissed Hues"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000); 
    return () => clearInterval(timer);
  }, [handleNext]);



  return (
    <section className="relative h-[110vh] md:min-h-screen w-full object-cover overflow-hidden flex flex-col items-center justify-center text-center text-[#FDFCF0] ">
      
      {/* 1. Background Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 -z-10 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-[5000ms] scale-110 "
            style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)' 
            }}
          >
            <div className="absolute inset-0 "></div>
          </div>
        </div>
      ))}

      {/* 2. Manual Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 md:left-8 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all text-white hidden md:block"
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-4 md:right-8 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all text-white hidden md:block"
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      {/* 3. Central Content */}
      <div className="z-10 px-4 max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-serif mb-4 drop-shadow-lg transition-all duration-700">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-xl md:text-2xl font-light mb-8 italic drop-shadow-md">
          {slides[currentSlide].subtitle}
        </p>

        <Link to="/shop" className="inline-block px-10 py-3 border border-white rounded-full hover:bg-[#FDFCF0] hover:text-[#4A2C1D] transition-all duration-500 uppercase tracking-widest text-sm font-bold">
          Shop Now
        </Link>
      </div>

      {/* 4. Bottom Progress Indicators */}
      <div className="absolute bottom-12 z-20 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[2px] transition-all duration-500 ${
              index === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroPage;