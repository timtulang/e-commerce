import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { ProductList } from './pages/ProductList';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Equip } from './pages/Equip'; // <-- Import Equip
import { Intel } from './pages/Intel'; // <-- Import Intel

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/equip" element={<Equip />} /> {/* <-- Wire Equip */}
          <Route path="/intel" element={<Intel />} /> {/* <-- Wire Intel */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;