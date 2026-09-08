import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [theme, setTheme] = useState('theme-landing');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setTheme('theme-landing');
    else if (path.includes('/products')) setTheme('theme-list');
    else if (path.includes('/product/')) setTheme('theme-details');
    else if (path === '/cart') setTheme('theme-cart');
    else if (path === '/checkout') setTheme('theme-checkout');
    else if (path === '/equip') setTheme('theme-equip'); // <-- Add
    else if (path === '/intel') setTheme('theme-intel'); // <-- Add
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${theme} bg-black relative z-0`}>
      <Navbar /> {/* Now floats independently on the right */}
      
      <main className="flex-grow w-full relative z-10">
        {children}
      </main>
      
      <footer className="relative bg-black border-t-8 border-white text-white py-12 px-8 flex justify-between items-center font-display text-4xl uppercase tracking-tighter z-20">
        <span className="skew-x-[-10deg]">Snug Rebel <span className="text-accent">©2026</span></span>
        <span className="text-xl font-chaos tracking-widest uppercase">Steal Your Heart</span>
      </footer>
    </div>
  );
};