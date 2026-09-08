import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockProducts';

export const Landing = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      
      <section className="relative h-[100svh] w-full overflow-hidden border-b-[16px] border-white">
        
        <div className="absolute inset-0 bg-accent z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#000000_3px,transparent_3px)] [background-size:18px_18px] opacity-[0.15]"></div>
        </div>

        {/* Chaotic Black Ink Blocks */}
        <div 
          className="absolute top-0 left-0 w-full h-[40vh] bg-black z-0 opacity-90"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 15%, 85% 40%, 65% 10%, 45% 60%, 25% 20%, 5% 70%, 0 45%)' }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[60vw] h-[50vh] bg-black z-0 opacity-90"
          style={{ clipPath: 'polygon(100% 100%, 0 100%, 20% 60%, 45% 80%, 70% 30%, 85% 75%, 100% 0)' }}
        />
        <div 
          className="absolute top-0 left-0 w-[30vw] h-full bg-black z-0 opacity-90"
          style={{ clipPath: 'polygon(0 0, 40% 0, 70% 25%, 30% 45%, 90% 70%, 50% 100%, 0 100%)' }}
        />

        {/* Top Left Calendar Module */}
        <motion.div 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="absolute top-8 left-8 z-30 flex flex-col gap-1 pointer-events-none"
        >
          <div className="flex items-end gap-2">
            <span className="font-display text-[8rem] leading-[0.7] text-white" style={{ WebkitTextStroke: '4px black', textShadow: '6px 6px 0px black' }}>
              09
            </span>
            <span className="font-display text-[4rem] leading-[0.8] text-white" style={{ WebkitTextStroke: '2px black' }}>
              / 09
            </span>
          </div>
          <div className="bg-white text-black font-display text-4xl px-4 py-1 border-4 border-black w-fit rotate-[-4deg] shadow-[4px_4px_0_rgba(0,0,0,1)]" style={{ clipPath: 'polygon(0 0, 100% 5%, 95% 100%, 5% 95%)' }}>
            WEDNESDAY
          </div>
          <div className="mt-2 bg-[#ff00ff] border-4 border-black w-12 h-12 rotate-12 flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <span className="font-display text-3xl text-white">☁</span>
          </div>
        </motion.div>

        {/* --- NEW: Massive Background Brand Typography --- */}
        <motion.div 
          initial={{ y: -50, opacity: 0, rotate: -10 }}
          animate={{ y: 0, opacity: 1, rotate: -3 }}
          transition={{ delay: 0.1, duration: 0.8, type: "spring" }}
          className="absolute top-[4%] left-[10%] md:left-[22%] z-[25] pointer-events-none select-none mix-blend-difference"
        >
          <h1 
            className="font-display text-[28vw] md:text-[20rem] uppercase tracking-tighter leading-[0.8] text-white"
          >
            SNUG REBEL
          </h1>
        </motion.div>

        {/* Floating Neon Shards */}
        <motion.div 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 45 }}
          transition={{ type: 'spring', damping: 12, delay: 0.3 }}
          className="absolute top-[20%] left-[50%] w-32 h-48 bg-[#00ff00] mix-blend-screen z-10"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />

        {/* Subject / Model */}
        <motion.div 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-[5%] h-[85%] w-[70%] md:w-[45%] z-20 pointer-events-none"
        >
          <img 
            src="src/assets/landingphoto.jpg" 
            alt="Lookbook Model" 
            className="object-cover h-full w-full object-top grayscale contrast-[1.5] drop-shadow-[15px_15px_0_rgba(0,0,0,1)]"
            style={{ clipPath: 'polygon(0 0, 100% 5%, 85% 100%, 0 100%)' }}
          />
          
          <div className="absolute bottom-[25%] left-[-10%] flex flex-col gap-2 rotate-[-5deg]">
             <div className="bg-black border-4 border-white text-white font-display text-2xl px-3 py-1 flex items-center gap-2 shadow-[6px_6px_0_var(--color-accent)] w-48">
               <span className="text-[#06b6d4]">HP</span> 
               <div className="h-2 w-full bg-[#06b6d4]"></div>
             </div>
             <div className="bg-black border-4 border-white text-white font-display text-2xl px-3 py-1 flex items-center gap-2 shadow-[6px_6px_0_var(--color-accent)] w-36 ml-6">
               <span className="text-[#d946ef]">SP</span> 
               <div className="h-2 w-full bg-[#d946ef]"></div>
             </div>
          </div>

          <div className="absolute top-[10%] right-[-10%] font-chaos text-5xl text-white rotate-[15deg] bg-black p-2 border-4 border-white" style={{ textShadow: '4px 4px 0px black' }}>
            ¥ 14,128
          </div>
        </motion.div>

        {/* Diagonal Ticker Tape */}
        <div className="absolute bottom-[10%] -left-10 w-[120%] h-12 bg-white rotate-[3deg] z-20 overflow-hidden flex items-center border-y-4 border-black">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
            className="whitespace-nowrap font-display text-3xl uppercase tracking-widest text-black flex gap-8"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i}> ★ SNUG REBEL DROP 01 ★ SECURE THE LOOT </span>
            ))}
          </motion.div>
        </div>

      </section>

      {/* Featured Products Grid */}
      <section className="bg-black py-24 relative z-30 overflow-hidden px-4 sm:px-8 xl:px-16">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col mb-16 relative">
            <h2 className="font-display text-8xl md:text-[9rem] uppercase tracking-tighter text-transparent leading-[0.8] rotate-[-2deg] z-10" style={{ WebkitTextStroke: '3px white' }}>
              Target <br/>
              <span className="text-accent ml-12" style={{ WebkitTextStroke: '0px', textShadow: '8px 8px 0px white' }}>Items</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 50, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 3 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className={index % 2 === 0 ? "md:mt-12" : "md:-mt-4"}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};