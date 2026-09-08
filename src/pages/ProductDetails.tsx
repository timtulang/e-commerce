import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/mockProducts';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/Button';

export const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(state => state.addItem);

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="font-display text-8xl text-white uppercase" style={{ WebkitTextStroke: '2px red' }}>
          Target Lost
        </h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black relative overflow-hidden pb-32">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.05] z-0 pointer-events-none"></div>
      
      {/* Massive Background Typography */}
      <div className="absolute top-[20%] left-[-10%] w-[120%] text-[25vw] font-display uppercase tracking-tighter text-[#18181b] leading-none z-0 pointer-events-none -rotate-6 select-none">
        CONFIDENTIAL
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 xl:px-12 relative z-10 pt-32 lg:pt-40 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Image Gallery (Stereoscopic Effect) */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-full lg:w-1/2 relative"
        >
          <Link to="/products" className="absolute -top-16 left-0 font-display text-3xl text-white uppercase hover:text-accent flex items-center gap-2">
            <span className="text-4xl">←</span> Back to Index
          </Link>

          <div className="relative aspect-[4/5] w-full group">
            {/* Background Offset Shard (Vivid Purple) */}
            <div 
              className="absolute inset-0 bg-accent translate-x-6 translate-y-6 z-0 transition-transform duration-300 group-hover:translate-x-8 group-hover:translate-y-8"
              style={{ clipPath: 'polygon(0 0, 100% 2%, 98% 100%, 2% 98%)' }}
            />
            {/* Secondary Black Offset for depth */}
            <div 
              className="absolute inset-0 bg-[#18181b] border-4 border-white translate-x-3 translate-y-3 z-10 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"
              style={{ clipPath: 'polygon(2% 2%, 98% 0, 100% 98%, 0 100%)' }}
            />
            {/* Main Image */}
            <img 
              src={product.image} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover z-20 border-4 border-white grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            />

            {/* Price Tag Overlay */}
            <motion.div 
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: -15 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -bottom-6 -right-6 z-30 bg-black text-white border-4 border-white p-4 shadow-[8px_8px_0_var(--color-accent)]"
            >
              <span className="font-chaos text-5xl">${product.price.toFixed(2)}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Product Intel */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.1 }}
          className="w-full lg:w-1/2 flex flex-col pt-8"
        >
          {/* Header Block */}
          <div className="flex flex-col items-start mb-8">
            <span className="bg-white text-black font-display text-2xl uppercase tracking-widest px-4 py-1 mb-4 rotate-[-2deg] border-2 border-black shadow-[4px_4px_0_var(--color-accent)]">
              {product.category}
            </span>
            <h1 className="font-display text-7xl md:text-[6rem] text-white uppercase leading-[0.85] tracking-tighter" style={{ textShadow: '6px 6px 0px rgba(0,0,0,1)' }}>
              {product.name}
            </h1>
          </div>

          {/* Brutalist Description Box */}
          <div className="bg-[#18181b] border-l-[12px] border-accent p-6 mb-12 shadow-[8px_8px_0_rgba(255,255,255,1)] rotate-[1deg]">
            <p className="font-sans text-xl text-white leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Variants Selection */}
          <div className="mb-10">
            <h3 className="font-display text-4xl text-white uppercase mb-4 tracking-widest flex items-center gap-4">
              Parameters <div className="h-1 flex-grow bg-white opacity-20"></div>
            </h3>
            <div className="flex flex-wrap gap-4">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVariant(variant)}
                  className={`font-display text-4xl uppercase px-6 py-2 transition-all duration-200 border-4 skew-x-[-10deg] ${
                    selectedVariant === variant
                      ? 'bg-accent text-white border-white shadow-[6px_6px_0_white] -translate-y-2'
                      : 'bg-black text-white border-white hover:bg-white hover:text-black hover:-translate-y-1'
                  }`}
                >
                  <span className="skew-x-[10deg] block">{variant}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row gap-6 mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center bg-black border-4 border-white p-2 shadow-[6px_6px_0_var(--color-accent)] w-fit skew-x-[-5deg]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="font-chaos text-4xl text-white px-4 hover:text-accent transition-colors skew-x-[5deg]"
              >-</button>
              <span className="font-display text-5xl text-white px-6 skew-x-[5deg] w-16 text-center">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="font-chaos text-4xl text-white px-4 hover:text-accent transition-colors skew-x-[5deg]"
              >+</button>
            </div>

            {/* Secure Item Button */}
            <div className="relative flex-grow">
              <Button 
                size="lg" 
                className="w-full h-full bg-white text-black border-white hover:bg-accent hover:text-white"
                onClick={handleAddToCart}
              >
                {isAdded ? 'Target Secured' : 'Extract Item'}
              </Button>
              
              {/* Floating Confirmation Animation */}
              <AnimatePresence>
                {isAdded && (
                  <motion.div 
                    initial={{ scale: 2, opacity: 0, rotate: 20 }}
                    animate={{ scale: 1, opacity: 1, rotate: -15 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-12 -right-4 pointer-events-none"
                  >
                    <span className="font-chaos text-5xl text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]" style={{ WebkitTextStroke: '2px black' }}>
                      ACQUIRED!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};