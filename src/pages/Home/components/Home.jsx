
import React from 'react';
import AboutSection from '../../../components/sections/AboutSection';
import Contactsection from '../../../components/sections/Contactsection';
import HeroPage from './HeroPage';
import Footer from '../../../components/common/Footer';
import { ProductCard } from '../../../components/product/ProductCard';
import  CategorySection  from '../../../components/sections/CategorySection';


const Home = () => {
  return (
    <div>
        <HeroPage />
     <ProductCard/>
     <CategorySection/>
        <AboutSection/>
        <Contactsection/>
        <Footer/>
    
    </div>
  )
}
export default Home;