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
    ...(product.images || []).filter(img => img !== product.thumbnail)
  ];

  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedImage(product.thumbnail);
  }, [product]);

  return (
    <>
      {/* Gallery Layout */}
      <div className="flex gap-4">

        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border transition
              ${selectedImage === img ? "border-[#8B6F47]" : "border-gray-200 hover:border-[#8B6F47]"}`}
            />
          ))}
        </div>

       
        <div
          className="flex-1 bg-white rounded-lg shadow-lg p-6 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[450px] object-contain transition duration-300"
          />
        </div>

      </div>

    
      {open && (
        <div className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center">

       
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-20 text-gray-900 text-3xl "
          >
            ✕
          </button>

          <div className="w-[70%] max-w-4xl">

            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <Zoom>
                    <img
                      src={img}
                      alt="product"
                      className="w-full h-[650px] object-contain bg-[#F3EFE0] cursor-zoom-in"
                    />
                  </Zoom>
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