import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setSearchQuery } from './store/searchSlice';
import { fetchProducts } from './features/products/productsSlice';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProductCard from './components/ProductCard';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUS';
import ContactUs from './pages/ContactUs';
import './App.css'

function App() {
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
    <Router>
      <ScrollToTop />
      <div className="relative">
        <Toaster position="top-right" />
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={handleSetSearchQuery}
          onShowCart={handleShowCart}
          onShowLogin={handleShowLogin}
        />
        
        <Routes>
          <Route path="/" element={
            <main>
              <section id="home">
                <Home />
              </section>
              <section id="shop">
                <ProductCard searchQuery={searchQuery} />
              </section>
              <section id="about">
                <AboutUs />
              </section>
              <section id="contact">
                <ContactUs />
              </section>
            </main>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        <Footer />
        <CartModal isOpen={showCart} onClose={handleCloseCart} />
        <LoginModal isOpen={showLogin} onClose={handleCloseLogin} />
      </div>
    </Router>
  )
}

export default App
