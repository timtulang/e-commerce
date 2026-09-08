import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/mockProducts';

export const Equip = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Select a few key items for the editorial spread
  const featuredGear = [
    { product: products[0], top: '45%', left: '30%' }, // Hoodie
    { product: products[2], top: '70%', left: '65%' }, // Pants
    { product: products[4], top: '60%', left: '40%' }, // Footwear
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-black relative overflow-hidden pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.05] z-0 pointer-events-none"></div>

      {/* Massive Background Title */}
      <div className="absolute top-[10%] right-[-5%] text-[25vw] font-display uppercase tracking-tighter text-[#18181b] leading-none z-0 pointer-events-none select-none">
        GEARSET
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 xl:px-12 relative z-10 pt-32 lg:pt-40">
        
        {/* Header */}
        <div className="mb-16 relative">
          <div className="bg-white text-black font-chaos text-3xl uppercase tracking-widest px-4 py-1 mb-2 w-fit rotate-[-3deg] border-4 border-black">
            FIELD MANUAL // 02
          </div>
          <h1 className="font-display text-8xl md:text-[9rem] uppercase tracking-tighter text-white leading-[0.8]" style={{ textShadow: '8px 8px 0px var(--color-accent)' }}>
            EQUIPMENT <span className="text-accent bg-black px-4" style={{ WebkitTextStroke: '2px white' }}>LOADOUT</span>
          </h1>
        </div>

        {/* Interactive Lookbook Canvas */}
        <div className="relative w-full aspect-[16/9] bg-[#18181b] border-8 border-white shadow-[16px_16px_0_var(--color-accent)] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop" 
            alt="Equip Lookbook"
            className="w-full h-full object-cover grayscale brightness-90 contrast-125"
          />

          {/* Hotspots */}
          {featuredGear.map((item, idx) => (
            <div 
              key={item.product.id}
              className="absolute z-20"
              style={{ top: item.top, left: item.left }}
              onMouseEnter={() => setActiveHotspot(item.product.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Pulsing Hotspot Button */}
              <div className="relative cursor-pointer">
                <div className="w-8 h-8 bg-accent border-4 border-black rounded-full animate-ping absolute inset-0"></div>
                <div className="w-8 h-8 bg-white border-4 border-black font-chaos text-xl flex items-center justify-center relative z-10 shadow-[4px_4px_0_black]">
                  +
                </div>

                {/* Hover Card */}
                <AnimatePresence>
                  {activeHotspot === item.product.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute left-12 top-0 bg-black border-4 border-white p-4 w-72 z-30 shadow-[8px_8px_0_var(--color-accent)] rotate-[2deg]"
                    >
                      <span className="bg-accent text-black font-display text-sm px-2 uppercase tracking-widest font-bold">
                        {item.product.category}
                      </span>
                      <h4 className="font-display text-3xl text-white uppercase mt-1 leading-none">{item.product.name}</h4>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-chaos text-3xl text-white">${item.product.price.toFixed(2)}</span>
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="font-display text-xl uppercase bg-white text-black px-3 py-1 hover:bg-accent hover:text-white transition-colors"
                        >
                          Inspect →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};