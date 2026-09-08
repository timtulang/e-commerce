import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/Button';

export const Cart = () => {
  const { items, cartTotal, updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  const isEmpty = items.length === 0;
  const shipping = isEmpty ? 0 : 15.00;
  const finalTotal = cartTotal + shipping;

  if (isEmpty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.05] z-0"></div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <span className="font-display text-[12vw] text-white uppercase leading-none" style={{ WebkitTextStroke: '2px red', textShadow: '8px 8px 0px rgba(255,0,0,0.5)' }}>
            NO ASSETS
          </span>
          <div className="bg-white text-black font-chaos text-4xl px-8 py-2 mt-4 rotate-[-3deg] shadow-[6px_6px_0_var(--color-accent)] border-4 border-black">
            INVENTORY EMPTY
          </div>
          <Link to="/products" className="mt-12">
            <Button size="lg">Return to Index</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-black relative overflow-hidden pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.05] z-0 pointer-events-none"></div>
      
      {/* Massive Background Shape */}
      <div 
        className="absolute top-0 right-0 w-[80vw] h-[60vh] bg-accent z-0 mix-blend-difference opacity-80"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 80%)' }}
      />

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 xl:px-12 relative z-10 pt-32 lg:pt-40 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Acquired Assets */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="mb-12 relative">
            <h1 className="font-display text-8xl md:text-[8rem] uppercase tracking-tighter text-white leading-[0.8]" style={{ textShadow: '8px 8px 0px black' }}>
              ACQUIRED <br/> 
              <span className="text-accent px-4" style={{ WebkitTextStroke: '0px', textShadow: '4px 4px 0px black' }}>ASSETS</span>
            </h1>
          </div>

          <div className="flex flex-col gap-8">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedVariant}`}
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100, scale: 0.9 }}
                  transition={{ type: "spring", delay: index * 0.1 }}
                  className="bg-[#18181b] border-4 border-white p-4 shadow-[8px_8px_0_var(--color-accent)] flex flex-col sm:flex-row gap-6 relative skew-x-[-2deg]"
                >
                  <div className="w-full sm:w-32 aspect-square border-2 border-white bg-black skew-x-[2deg] overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-grow skew-x-[2deg]">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-display text-4xl text-white uppercase leading-none">{item.product.name}</h3>
                        <span className="bg-white text-black font-display text-xl px-2 py-1 uppercase tracking-widest mt-2 inline-block shadow-[2px_2px_0_var(--color-accent)]">
                          PARAM: {item.selectedVariant}
                        </span>
                      </div>
                      <span className="font-chaos text-4xl text-white">${item.product.price.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center bg-black border-2 border-white w-fit shadow-[4px_4px_0_var(--color-accent)]">
                        <button onClick={() => updateQuantity(item.product.id, item.selectedVariant, item.quantity - 1)} className="font-chaos text-3xl text-white px-4 hover:text-accent">-</button>
                        <span className="font-display text-4xl text-white px-4 w-12 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.selectedVariant, item.quantity + 1)} className="font-chaos text-3xl text-white px-4 hover:text-accent">+</button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.product.id, item.selectedVariant)}
                        className="font-display text-2xl text-gray-400 hover:text-accent uppercase tracking-widest underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Operation Summary */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="bg-black border-[6px] border-white p-8 shadow-[12px_12px_0_var(--color-accent)] sticky top-32 rotate-[1deg]"
          >
            <h2 className="font-chaos text-4xl text-white uppercase border-b-4 border-white pb-4 mb-6">Operation Total</h2>
            
            <div className="flex flex-col gap-4 font-display text-3xl uppercase text-white tracking-wider mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Freight</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t-4 border-dashed border-white pt-6 mt-2">
                <span className="text-4xl text-accent">Total Funds</span>
                <span className="text-5xl font-chaos">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-white text-black border-black hover:bg-accent hover:text-white hover:border-white shadow-[6px_6px_0_black]"
              onClick={() => navigate('/checkout')}
            >
              Initialize Transfer
            </Button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};