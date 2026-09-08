import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { cartTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const finalTotal = cartTotal + 15.00; // Adding dummy shipping

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  // The Victory Screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-accent fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#000000_3px,transparent_3px)] [background-size:24px_24px] opacity-20 z-0"></div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, times: [0, 0.6, 1], type: "spring" }}
          className="absolute w-[150vw] h-[50vh] bg-black rotate-[-15deg] z-10 flex items-center justify-center border-y-[16px] border-white shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="flex flex-col items-center">
            <h1 className="font-display text-[15vw] md:text-[12rem] text-transparent uppercase tracking-tighter leading-[0.8]" style={{ WebkitTextStroke: '4px white', textShadow: '15px 15px 0px var(--color-accent)' }}>
              MISSION
            </h1>
            <h1 className="font-display text-[12vw] md:text-[10rem] bg-white text-black px-8 mt-[-2rem] uppercase tracking-tighter rotate-[3deg] shadow-[15px_15px_0_var(--color-accent)] border-8 border-black">
              ACCOMPLISHED
            </h1>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-20 mt-[60vh]"
        >
          <Link to="/">
            <Button size="lg" className="bg-black text-white border-white hover:bg-white hover:text-black">
              Return to Hideout
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-black relative overflow-hidden pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.05] z-0 pointer-events-none"></div>
      
      <div className="max-w-[1000px] mx-auto w-full px-4 sm:px-8 relative z-10 pt-32 lg:pt-40">
        
        <div className="mb-12 relative flex items-end justify-between border-b-8 border-white pb-4">
          <h1 className="font-display text-7xl md:text-[7rem] uppercase tracking-tighter text-white leading-none rotate-[-2deg]" style={{ textShadow: '6px 6px 0px var(--color-accent)' }}>
            SECURE <br/> ROUTE
          </h1>
          <span className="font-chaos text-4xl text-accent pb-4 hidden md:block">FINAL PHASE</span>
        </div>

        <form onSubmit={handleConfirmOrder} className="flex flex-col gap-16">
          
          {/* Section 1: Intel */}
          <div className="bg-[#18181b] border-4 border-white p-8 shadow-[12px_12px_0_var(--color-accent)] relative">
            <div className="absolute -top-6 -left-6 bg-accent text-black font-chaos text-3xl px-4 py-1 border-4 border-black rotate-[-5deg]">01 // INTEL</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <input type="email" required placeholder="EMAIL ADDRESS" className="w-full bg-black border-4 border-gray-700 text-white p-4 font-display text-3xl uppercase tracking-widest focus:border-white focus:outline-none focus:shadow-[4px_4px_0_var(--color-accent)] skew-x-[-2deg] placeholder:text-gray-600" />
              <input type="text" required placeholder="ALIAS / NAME" className="w-full bg-black border-4 border-gray-700 text-white p-4 font-display text-3xl uppercase tracking-widest focus:border-white focus:outline-none focus:shadow-[4px_4px_0_var(--color-accent)] skew-x-[-2deg] placeholder:text-gray-600" />
            </div>
          </div>

          {/* Section 2: Drop Zone */}
          <div className="bg-[#18181b] border-4 border-white p-8 shadow-[12px_12px_0_var(--color-accent)] relative">
            <div className="absolute -top-6 -left-6 bg-accent text-black font-chaos text-3xl px-4 py-1 border-4 border-black rotate-[-5deg]">02 // DROP ZONE</div>
            <div className="flex flex-col gap-6 mt-4">
              <input type="text" required placeholder="STREET ADDRESS" className="w-full bg-black border-4 border-gray-700 text-white p-4 font-display text-3xl uppercase tracking-widest focus:border-white focus:outline-none focus:shadow-[4px_4px_0_var(--color-accent)] skew-x-[-2deg] placeholder:text-gray-600" />
              <div className="grid grid-cols-2 gap-6">
                <input type="text" required placeholder="CITY" className="w-full bg-black border-4 border-gray-700 text-white p-4 font-display text-3xl uppercase tracking-widest focus:border-white focus:outline-none focus:shadow-[4px_4px_0_var(--color-accent)] skew-x-[-2deg] placeholder:text-gray-600" />
                <input type="text" required placeholder="POSTAL CODE" className="w-full bg-black border-4 border-gray-700 text-white p-4 font-display text-3xl uppercase tracking-widest focus:border-white focus:outline-none focus:shadow-[4px_4px_0_var(--color-accent)] skew-x-[-2deg] placeholder:text-gray-600" />
              </div>
            </div>
          </div>

          {/* Section 3: Transfer & Confirm */}
          <div className="bg-black border-[8px] border-accent p-8 shadow-[16px_16px_0_white] relative rotate-[1deg]">
            <div className="flex justify-between items-center mb-8 border-b-4 border-gray-700 pb-4">
              <span className="font-display text-4xl text-white uppercase tracking-widest">Total</span>
              <span className="font-chaos text-6xl text-accent">${finalTotal.toFixed(2)}</span>
            </div>
            
            {/* Fake Payment Input */}
            <input type="text" required placeholder="CARD NUMBER" className="w-full bg-[#18181b] border-4 border-gray-700 text-white p-4 font-display text-3xl uppercase tracking-widest focus:border-accent focus:outline-none focus:shadow-[4px_4px_0_white] skew-x-[-2deg] mb-8 placeholder:text-gray-600" />

            <Button 
              type="submit"
              size="lg" 
              disabled={isProcessing}
              className="w-full bg-white text-black border-white hover:bg-accent hover:text-white text-5xl"
            >
              {isProcessing ? 'AUTHORIZING...' : 'CONFIRM TRANSFER'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};