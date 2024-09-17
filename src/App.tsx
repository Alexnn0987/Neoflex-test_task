import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const count = storedCart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    setCartCount(count);
  }, []);

  return (
    <div className='page_wrapper'>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Catalog setCartCount={setCartCount} />} />
        <Route path="/cart" element={<Cart setCartCount={setCartCount} />} />
      </Routes>
      <Footer />
    </div>
  );
}; 

export default App;