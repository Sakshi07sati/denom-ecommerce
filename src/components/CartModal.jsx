import Cart from '../pages/Cart';

const CartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FDFCF0] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4 border border-[#4A2C1D]/10">
        <div className="p-4 border-b border-[#4A2C1D]/10">
          <button 
            onClick={onClose}
            className="float-right text-[#4A2C1D] hover:text-[#be9b7b] text-2xl"
          >
            ×
          </button>
          <h2 className="text-2xl font-serif text-[#4A2C1D]">Your Cart</h2>
        </div>
        <Cart onClose={onClose} />
      </div>
    </div>
  );
};

export default CartModal;
