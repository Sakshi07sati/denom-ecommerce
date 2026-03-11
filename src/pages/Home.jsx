import { useScrollToTop } from '../hooks/useScrollToTop';

const Home = () => {
  useScrollToTop();
  return (
    <section className=" relative h-[120vh] md:min-h-screen flex flex-col items-center justify-center text-center text-[#FDFCF0]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/02/53/15/02531522cd559a88a78bcf7a8682faf7.jpg')" }}
      >
        {/* Subtle dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <h1 className="text-5xl md:text-8xl font-serif mb-4 drop-shadow-sm">
        Retro Glamour Finds
      </h1>
      
      <p className="text-xl md:text-2xl font-light mb-8 italic">
        Curated Vintage Fashion for You
      </p>

      <a href="#shop" className="px-10 py-3 border border-white rounded-full hover:bg-[#EAE3D2] hover:text-[#4A2C1D] transition-all duration-300 uppercase tracking-widest text-sm">
        Shop Now
      </a>
    </section>
  );
};
export default Home;