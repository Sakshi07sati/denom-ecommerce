import React, { useState } from 'react';
import { ChevronDown, Truck, RotateCcw, Shield, Award, Info } from 'lucide-react';

const ProductSpecification = ({ product }) => {
  const [openSection, setOpenSection] = useState('shipping');

  const specifications = [
    { label: 'Brand', value: product.brand || 'N/A' },
    { label: 'Category', value: product.category || 'N/A' },
    { label: 'SKU', value: product.sku || 'N/A' },
    { label: 'Weight', value: `${product.weight || 'N/A'}g` },
    { label: 'Dimensions', value: product.dimensions ? `${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth} cm` : 'N/A' },
    { label: 'Min Order', value: product.minimumOrderQuantity || '1' },
    { label: 'Warranty', value: product.warrantyInformation || 'Standard' },
    { label: 'Availability', value: product.availabilityStatus || 'In Stock' }
  ];

  const infoSections = [
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: Truck,
      content: product.shippingInformation || 'Standard shipping available'
    },
    {
      id: 'return',
      title: 'Returns & Exchange',
      icon: RotateCcw,
      content: product.returnPolicy || 'Easy 14 days return & exchange available'
    },
    {
      id: 'warranty',
      title: 'Warranty & Care',
      icon: Shield,
      content: product.warrantyInformation || 'Standard brand warranty applies'
    }
  ];

  return (
    <div className="mt-16 border-t border-gray-100 pt-12">
      <div className="max-w-7xl mx-auto"> {/* Increased width to allow better spreading */}
        <div className="flex items-center gap-2 mb-10">
          <Info size={20} className="text-[#8B6F47]" />
          <h2 className="text-xl font-serif text-[#4A2C1D] uppercase tracking-wider">
            Product Details & Care
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
              Specifications
            </h3>
        
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {specifications.map((spec, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-[12px] uppercase text-gray-400 font-extrabold tracking-widest mb-1">
                    {spec.label}
                  </span>
                  <span className="text-md text-[#4A2C1D] font-medium border-l-2 border-[#F5E6D3] pl-3">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
              Service & Policies
            </h3>
            <div className="space-y-3">
              {infoSections.map((section) => {
                const Icon = section.icon;
                const isOpen = openSection === section.id;

                return (
                  <div key={section.id} className="border border-gray-100 rounded-sm">
                    <button
                      onClick={() => setOpenSection(isOpen ? null : section.id)}
                      className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isOpen ? 'bg-[#FDFCF0]' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-[#8B6F47]" />
                        <span className="text-md font-semibold text-[#4A2C1D]">{section.title}</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {isOpen && (
                      <div className="px-11 pb-4 pt-2 text-sm text-gray-500 bg-[#FDFCF0] leading-relaxed animate-in slide-in-from-top-1">
                        {section.content}
                      </div>
                    )}
                  </div>
                );})}
              
          
              <div className="mt-4 flex items-center justify-center p-3 bg-gray-100 rounded text-[10px] uppercase tracking-tighter text-gray-400 font-bold">
                 Genuine Product • Quality Checked • Secure Packaging
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductSpecification;