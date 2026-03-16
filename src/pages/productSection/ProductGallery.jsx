import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Zoom from "react-medium-image-zoom";

import "swiper/css";
import "swiper/css/navigation";
import "react-medium-image-zoom/dist/styles.css";

const ProductGallery = ({ product }) => {
  const images = [
    product.thumbnail,
    ...(product.images || []).filter((img) => img !== product.thumbnail),
  ];

  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedImage(product.thumbnail);
  }, [product]);
  
    useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
    
        <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border transition shrink-0
              ${selectedImage === img ? "border-[#8B6F47]" : "border-gray-200 hover:border-[#8B6F47]"}`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div
          className="flex-1 bg-white rounded-lg shadow-lg p-4 md:p-6 cursor-pointer order-1 md:order-2"
          onClick={() => setOpen(true)}
        >
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[300px] md:h-[450px] object-contain transition duration-300"
          />
        </div>
      </div>

    
      {open && (
        <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
       
          <button
            onClick={() => setOpen(false)}
            className="absolute top-20 right-4 md:top-20 md:right-10 text-gray-900 text-3xl z-[10000] p-2"
          >
            ✕
          </button>

          <div className="w-full md:w-[85%] max-w-5xl px-4">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              className="product-swiper"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="flex items-center justify-center h-screen md:h-auto">
                    <Zoom>
                      <img
                        src={img}
                        alt="product"
                        className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain bg-white cursor-zoom-in"
                      />
                    </Zoom>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;