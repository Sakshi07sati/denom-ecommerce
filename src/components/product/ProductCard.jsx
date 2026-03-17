import { FeaturedCollection } from './FeaturedCollection';
import { Link } from 'react-router-dom';

export const ProductCard= () => {
  return (
    <section className="bg-[#FAF8F1] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="lg:text-4xl text-3xl md:text-5xl  font-serif text-[#4A2C1D] mb-4 italic">The Curated Gallery</h2>
          <p className="text-[#9B8B75] tracking-[0.2em] uppercase text-sm">Exclusive Saenom Arrivals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {FeaturedCollection.map((item) => (
            <div key={item.id} className="group relative">
              <div className="overflow-hidden aspect-square sm:aspect-[3/4] bg-[#EAD9C3] rounded-sm shadow-xl">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
                {/* Custom Badge */}
                <span className="absolute top-4 left-4 bg-[#4A2C1D] text-[#FAF8F1] text-[10px] px-3 py-1 tracking-tighter uppercase font-bold">
                  {item.badge}
                </span>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-[11px] text-[#be9b7b] font-bold tracking-widest mb-1">{item.subtitle}</p>
                <h3 className="text-xl font-serif text-[#4A2C1D]">{item.title}</h3>
                <p className="text-[#8B6F47] mt-2 font-medium">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
           <Link to="/shop" className="border-b-2 border-[#4A2C1D] text-[#4A2C1D] pb-1 hover:text-[#be9b7b] hover:border-[#be9b7b] transition-all font-serif text-lg">
             Explore More Collection →
           </Link>
        </div>
      </div>
    </section>
  );
};
 