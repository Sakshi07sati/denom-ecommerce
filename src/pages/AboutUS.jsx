import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const AboutUs = () => {
  useScrollToTop();
return (
    <section className="bg-[#FDFCF0] py-20 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
        
            <div className="lg:w-1/2 space-y-8">
                <h2 className="text-5xl md:text-6xl font-serif text-[#4A2C1D]">
                    Our Story
                </h2>
                
                <p className="text-gray-800 leading-relaxed text-md max-w-xl">
                    At our upscale fashion store, we take pride in offering a hand-picked 
                    selection of curated vintage pieces. Our collection is renowned for its 
                    superior quality, exquisite craftsmanship, and unparalleled style. 
                </p>

                <p className="text-gray-800 leading-relaxed text-md max-w-xl">
                    From classic silhouettes to trendy finds, we curate a diverse range of 
                    designs to suit every occasion. We specialize in carrying brands that 
                    prioritize comfort, durability, and timeless appeal.
                </p>

                
                <a href='#contact' className="inline-block bg-[#4A2C1D] text-white px-10 py-3.5 rounded-full font-medium tracking-wide hover:bg-[#EAE3D2] hover:text-[#4A2C1D] transition-colors duration-200 delay-150">
                    Contact Us
                </a>
            </div>

         
            <div className="lg:w-1/2 relative">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl">
                    <img 
                        src="https://i.pinimg.com/1200x/26/37/7c/26377ca88c913561b1fd7a641d4d370d.jpg" 
                        alt="Store Interior" 
                        className="w-full h-full object-cover"
                    />
                </div>
         
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#A78BFA]/20 -z-10"></div>
            </div>

        </div>
    </section>
);
};

export default AboutUs;