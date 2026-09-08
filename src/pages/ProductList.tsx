import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockProducts';

const CATEGORIES = ['All', 'Outerwear', 'T-Shirts', 'Bottoms', 'Accessories', 'Footwear'];

export const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-black relative overflow-hidden">
      
      {/* Halftone Texture Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.05] z-0 pointer-events-none"></div>
      
      {/* 
        Massive Solid Left Background (The Blue Split)
        Uses the dynamic --color-accent variable 
      */}
      <div 
        className="fixed top-0 left-0 w-[100vw] lg:w-[45vw] h-[100vh] bg-accent z-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
      />

      {/* Floating Ticker Tape (Behind the products, in front of the black background) */}
      <div className="fixed top-[55%] -left-10 w-[120vw] h-16 bg-[#18181b] rotate-[-5deg] z-[5] overflow-hidden flex items-center opacity-80 border-y-4 border-[#27272a] pointer-events-none">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="whitespace-nowrap font-display text-5xl uppercase tracking-widest text-[#3f3f46] flex gap-8"
        >
          {[...Array(15)].map((_, i) => (
            <span key={i}>★ CATALOG ★ SECURE THE ITEMS</span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 xl:px-12 relative z-10 flex flex-col lg:flex-row gap-12 pt-32 pb-32 min-h-screen">
        
        {/* Left Column: Filter Sidebar */}
        <aside className="w-full lg:w-[30%] flex flex-col gap-10">
          
          {/* Section Header Matching the Reference Image */}
          <div className="relative ml-4">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="bg-white text-black font-chaos text-3xl uppercase tracking-widest px-4 py-1 mb-2 w-fit rotate-[-6deg] border-4 border-black z-20 relative"
            >
              FILE // 01
            </motion.div>
            
            <motion.h1 
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 15, delay: 0.1 }}
              className="font-display text-[7rem] leading-[0.85] uppercase tracking-tighter flex flex-col relative z-10 -ml-2"
            >
              {/* Hollow "ITEM" */}
              <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: '2px white', textShadow: '4px 4px 0px black' }}
              >
                ITEM
              </span>
              {/* Solid "INDEX" on Black Block */}
              <span className="bg-black text-accent w-fit px-4 py-1 -mt-4 shadow-[4px_4px_0_white]">
                INDEX
              </span>
            </motion.h1>
          </div>

          {/* Filter Categories */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 mt-4"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`group relative flex items-center justify-between font-display text-4xl uppercase tracking-widest px-6 py-2 transition-all duration-200 w-full md:w-[85%] text-left skew-x-[-12deg] border-4 ${
                    isActive 
                      ? 'bg-accent text-white border-white shadow-[8px_8px_0_black] ml-4' 
                      : 'bg-black text-white border-black border-b-white border-l-white hover:ml-2 hover:bg-white hover:text-black hover:border-white'
                  }`}
                >
                  <span className="skew-x-[12deg] block relative z-10">{category}</span>
                  {isActive && (
                    <span className="skew-x-[12deg] font-chaos text-2xl text-black block relative z-10">★</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </aside>

        {/* Right Column: Product Grid */}
        <main className="w-full lg:w-[70%] relative z-10">
          
          {/* Active Filter Status Bar */}
          <div className="bg-black border-4 border-white p-3 w-full flex justify-between items-center rotate-[-1deg] mb-12 shadow-[0_6px_0_var(--color-accent)] relative">
            <span className="font-display text-4xl uppercase tracking-widest flex gap-4">
              <span className="text-accent">TARGET:</span> {activeCategory}
            </span>
            <span className="font-chaos text-2xl text-white">
              FOUND: {filteredProducts.length}
            </span>
          </div>

          {/* Product Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product, index) => (
                <motion.div 
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", damping: 15, delay: index * 0.05 }}
                  className={index % 2 === 0 ? "rotate-[1deg]" : "rotate-[-1deg] mt-4"}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="w-full py-24 flex justify-center items-center">
              <span className="font-display text-5xl uppercase text-white tracking-widest bg-black border-4 border-white p-8 rotate-[-3deg] shadow-[8px_8px_0_var(--color-accent)]">
                NO TARGETS FOUND IN SECTOR
              </span>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};