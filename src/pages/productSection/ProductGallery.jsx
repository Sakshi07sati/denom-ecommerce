// import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import Zoom from "react-medium-image-zoom";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/styles.min.css";
// import "swiper/css";
// import "swiper/css/navigation";


// const ProductGallery = ({ product }) => {
//   const images = [
//     product.thumbnail,
//     ...(product.images || []).filter((img) => img !== product.thumbnail),
//   ];

//   const [selectedImage, setSelectedImage] = useState(product.thumbnail);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     setSelectedImage(product.thumbnail);
//   }, [product]);
  
//     useEffect(() => {
//     if (open) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [open]);

//   return (
//     <>
//       <div className="flex flex-col md:flex-row gap-4">
    
//         <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto">
//           {images.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               onClick={() => setSelectedImage(img)}
//               className={`w-16 h-16 object-cover rounded-md cursor-pointer border transition shrink-0
//               ${selectedImage === img ? "border-[#8B6F47]" : "border-gray-200 hover:border-[#8B6F47]"}`}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div
//           className="flex-1 bg-white rounded-lg shadow-lg p-4 md:p-6 cursor-pointer  order-1 md:order-2"
//           onClick={() => setOpen(true)}
//         >
//           <img
//             src={selectedImage}
//             alt={product.title}
//             className="w-full h-[300px] md:h-[450px] object-contain transition duration-300"
//           />
//         </div>
//       </div>

    
//       {open && (
//         <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
       
//           <button
//             onClick={() => setOpen(false)}
//             className="absolute top-20 right-4 md:top-20 md:right-10 text-gray-900 text-3xl z-[10000] p-2"
//           >
//             ✕
//           </button>

//           <div className="w-full md:w-[85%] max-w-5xl px-4">
//             <Swiper
//               modules={[Navigation]}
//               navigation
//               spaceBetween={10}
//               className="product-swiper"
//             >
//               {images.map((img, i) => (
//                 <SwiperSlide key={i}>
//                   <div className="flex items-center justify-center h-screen md:h-auto">
//                     <Zoom>
//                       <img
//                         src={img}
//                         alt="product"
//                         className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain bg-white cursor-zoom-in"
//                       />
//                     </Zoom>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductGallery;

// // import { useState, useEffect } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation, Pagination } from "swiper/modules";
// // import InnerImageZoom from "react-inner-image-zoom";
// // import "react-inner-image-zoom/lib/styles.min.css";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";

// // const ProductGallery = ({ product }) => {
// //   const images = [
// //     product.thumbnail,
// //     ...(product.images || []).filter((img) => img !== product.thumbnail),
// //   ];

// //   const [selectedImage, setSelectedImage] = useState(product.thumbnail);
// //   const [open, setOpen] = useState(false);

// //   useEffect(() => {
// //     setSelectedImage(product.thumbnail);
// //   }, [product]);

// //   useEffect(() => {
// //     document.body.style.overflow = open ? "hidden" : "unset";
// //   }, [open]);

// //   return (
// //     <>
// //       <div className="flex flex-col md:flex-row gap-4">
        
// //         {/* Thumbnails */}
// //         <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto">
// //           {images.map((img, i) => (
// //             <img
// //               key={i}
// //               src={img}
// //               onClick={() => setSelectedImage(img)}
// //               className={`w-16 h-16 object-cover rounded-md cursor-pointer border transition shrink-0
// //               ${
// //                 selectedImage === img
// //                   ? "border-[#8B6F47]"
// //                   : "border-gray-200 hover:border-[#8B6F47]"
// //               }`}
// //             />
// //           ))}
// //         </div>

// //         {/* Main Image with ZOOM */}
// //         <div
// //           className="flex-1 bg-white rounded-lg shadow-lg p-4 md:p-6 order-1 md:order-2"
// //           onClick={() => setOpen(true)}
// //         >
// //           <InnerImageZoom
// //             src={selectedImage}
// //             zoomSrc={selectedImage}
// //             zoomType="hover"
// //             zoomPreload={true}
// //             className="w-full h-[300px] md:h-[450px] object-contain"
// //           />
// //         </div>
// //       </div>

// //       {/* FULL SCREEN SWIPER */}
// //       {open && (
// //         <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
          
// //           {/* Close Button */}
// //           <button
// //             onClick={() => setOpen(false)}
// //             className="absolute top-5 right-5 text-black text-3xl z-[10000]"
// //           >
// //             ✕
// //           </button>

// //           <div className="w-full md:w-[85%] max-w-5xl px-4">
// //             <Swiper
// //               modules={[Navigation, Pagination]}
// //               navigation
// //               pagination={{ clickable: true }}
// //               spaceBetween={10}
// //             >
// //               {images.map((img, i) => (
// //                 <SwiperSlide key={i}>
// //                   <div className="flex items-center justify-center h-screen md:h-auto">
                    
// //                     {/* ZOOM inside swiper */}
// //                     <InnerImageZoom
// //                       src={img}
// //                       zoomSrc={img}
// //                       zoomType="hover"
// //                       zoomPreload={true}
// //                       className="max-w-full max-h-[80vh] object-contain"
// //                     />

// //                   </div>
// //                 </SwiperSlide>
// //               ))}
// //             </Swiper>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default ProductGallery;

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom as SwiperZoom } from "swiper/modules";
import InnerImageZoom from "react-inner-image-zoom";
import {Expand} from 'lucide-react';

// Import Styles
import "react-inner-image-zoom/lib/styles.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

const ProductGallery = ({ product, onOpenChange }) => {
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
    document.body.style.overflow = open ? "hidden" : "unset";
    if(onOpenChange) onOpenChange(open);
  }, [open,onOpenChange]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto custom-scrollbar">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onMouseEnter={() => setSelectedImage(img)} // Amazon-style: change on hover
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition shrink-0
              ${selectedImage === img ? "border-[#8B6F47]" : "border-transparent hover:border-gray-300"}`}
            />
          ))}
        </div>

        {/* Main Image - AMAZON STYLE ZOOM */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-2 order-1 md:order-2 relative group">
          <InnerImageZoom
            src={selectedImage}
            zoomSrc={selectedImage}
            zoomType="hover"      // This creates the Amazon hover effect
            zoomScale={1.8}       // Adjust how deep the zoom is
            zoomPreload={true}
            hideHint={true}       // Removes the "magnifying glass" icon for a cleaner look
            className="rounded-lg"
          />
          
          {/* Fullscreen Trigger Overlay */}
          <button 
            onClick={() => setOpen(true)}
            className="absolute bottom-4 right-4  bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
           <Expand size={24} />

          </button>
        </div>
      </div>

      {/* FULL SCREEN MODAL (Maintains Swiper functionality) */}
      {open && (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col">
          <button
            onClick={() => setOpen(false)}
            className="absolute text-gray-900 lg-[top-20 right-20] top-20 right-10 text-2xl font-light z-[10000] hover:rotate-90 transition-transform duration-300"
          >
            ✕
          </button>

          <div className="w-full h-full">
            <Swiper
              modules={[Navigation, SwiperZoom]}
              navigation
              zoom={true} // Allows pinch-to-zoom on mobile
              grabCursor={true}
              className="h-full w-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="swiper-zoom-container">
                    <img src={img} alt="product" className="max-h-screen object-contain" />
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