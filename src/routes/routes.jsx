import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setSearchQuery } from '../store/searchSlice';
import { fetchProducts } from '../features/products/productsSlice';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/common/Navbar';
import Wishlist from '../pages/Wishlist';
import CartModal from '../components/modal/CartModal';
import LoginModal from '../components/modal/LoginModal';
import Home from './../pages/Home/components/Home';
import ShopSection from '../components/sections/ShopSection';
import ProductDetail from '../pages/productSection/ProductDetail';
// import ProductsCardItem from './pages/ProductsCardItem';
import AboutStory from '../pages/AboutUs/AboutStory';
import ContactUs from '../pages/contacts/ContactUs';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSucess';



function AllRoutes() {
   const [showCart, setShowCart] = useState(false);
   const [showLogin, setShowLogin] = useState(false);
   const searchQuery = useSelector((state) => state.search.query);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   const handleSetSearchQuery = (query) => {
      dispatch(setSearchQuery(query));
   };

   const handleShowCart = () => {
      setShowCart(true);
   };

   const handleCloseCart = () => {
      setShowCart(false);
   };

   const handleShowLogin = () => {
      setShowLogin(true);
   };

   const handleCloseLogin = () => {
      setShowLogin(false);
   };

   return (
      <>

         <div className="relative pt-20">
            <Toaster position="top-right" />
            <Navbar
               searchQuery={searchQuery}
               setSearchQuery={handleSetSearchQuery}
               onShowCart={handleShowCart}
               onShowLogin={handleShowLogin}
            />

            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<AboutStory />} />
               <Route path="/shop" element={<ShopSection searchQuery={searchQuery} />} />
               <Route path="/contact" element={<ContactUs />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/product/:id" element={<ProductDetail key={window.location.pathname} />} />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/order-success" element={<OrderSuccess />} />

            </Routes>

         </div>
         <CartModal isOpen={showCart} onClose={handleCloseCart} />
         <LoginModal isOpen={showLogin} onClose={handleCloseLogin} />

      </>
   )
}

export default AllRoutes;
