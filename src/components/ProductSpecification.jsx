import React, { useState } from 'react';
import { ChevronDown, Package, Truck, RotateCcw, Shield, Award } from 'lucide-react';

const SpecificationSection = ({ specifications }) => (
  <div className="space-y-3">
    {specifications.map((spec, index) => (
      <div key={index} className="flex justify-between items-start py-3 border-b border-[#EAD9C3] last:border-b-0">
        <span className="text-[#6B5436] font-medium">{spec.label}</span>
        <span className="text-[#4A2C1D] font-semibold text-right">{spec.value}</span>
      </div>
    ))}
  </div>
);

const ProductSpecification = ({ product }) => {
  const [expandedSection, setExpandedSection] = useState('specifications');

  const specifications = [
    { label: 'Brand', value: product.brand || 'N/A' },
    { label: 'Category', value: product.category || 'N/A' },
    {label:'Description', value:product.description || 'N/A'},
    { label: 'SKU', value: product.sku || 'N/A' },
    { label: 'Stock', value: `${product.stock} units` },
    { label: 'Weight', value: `${product.weight || 'N/A'} grams` },
    { label: 'Dimensions', value: product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` : 'N/A' },
    { label: 'Minimum Order', value: product.minimumOrderQuantity || '1' }
  ];

  const infoSections = [
    {
      id: 'warranty',
      title: 'Warranty Information',
      icon: Shield,
      content: product.warrantyInformation || 'No warranty information available'
    },
    {
      id: 'shipping',
      title: 'Shipping Information',
      icon: Truck,
      content: product.shippingInformation || 'Standard shipping available'
    },
    {
      id: 'return',
      title: 'Return Policy',
      icon: RotateCcw,
      content: product.returnPolicy || 'No return policy'
    },
    {
      id: 'availability',
      title: 'Availability Status',
      icon: Award,
      content: product.availabilityStatus || 'Check availability'
    }
  ];

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Specifications Card */}
      <div className="lg:col-span-3 bg-white rounded-lg border border-[#D4A574] shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#F5E6D3] to-[#EAD9C3] px-6 py-4 border-b border-[#D4A574]">
          <h3 className="text-lg font-serif text-[#4A2C1D]">Product Specifications</h3>
        </div>
        <div className="p-6">
          <SpecificationSection specifications={specifications} />
        </div>
      </div>

      {/* Info Sections */}
      {infoSections.map(section => {
        const IconComponent = section.icon;
        const isExpanded = expandedSection === section.id;

        return (
          <div key={section.id} className="bg-white rounded-lg border border-[#D4A574] shadow-sm overflow-hidden hover:shadow-md transition">
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#F5E6D3] to-[#EAD9C3] border-b border-[#D4A574] flex items-center justify-between hover:bg-[#EAD9C3] transition"
            >
              <div className="flex items-center gap-3">
                <IconComponent size={20} className="text-[#8B6F47]" />
                <h3 className="font-serif text-[#4A2C1D] text-base">{section.title}</h3>
              </div>
              <ChevronDown
                size={20}
                className={`text-[#9B8B75] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            {isExpanded && (
              <div className="px-6 py-4 text-[#6B5436] text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductSpecification;
