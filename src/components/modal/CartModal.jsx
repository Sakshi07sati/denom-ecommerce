import Cart from '../../pages/Cart';
import { X } from 'lucide-react';

const CartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

    
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-[#4A2C1D] hover:bg-[#4A2C1D] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

       
        <div className="overflow-y-auto">
           <Cart onClose={onClose} />
        </div>
        
      </div>
    </div>
  );
};

export default CartModal;