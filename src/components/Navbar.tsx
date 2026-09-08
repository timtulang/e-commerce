import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

const menuItems = [
  { name: 'Hideout', path: '/', angle: 'rotate-3' },
  { name: 'Shop', path: '/products', angle: '-rotate-6' },
  { name: 'Equip', path: '/equip', angle: 'rotate-2' }, // Points to Equip
  { name: 'Intel', path: '/intel', angle: '-rotate-12' }, // Points to Intel
];

const Navbar = () => {
  const itemCount = useCartStore((state) => state.itemCount);
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect scrolling to hide the menu
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // The full menu should be visible if we forced it open, OR if we are on the main page and haven't scrolled down.
  const showFullMenu = isMenuOpen || (isMainPage && !isScrolled);
  // Show the toggle button if the full menu is hidden
  const showToggleBtn = !showFullMenu;

  return (
    <>
      {/* The Toggle Button (Appears when scrolling or on other pages) */}
      <AnimatePresence>
        {showToggleBtn && (
          <motion.button
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            onClick={() => setIsMenuOpen(true)}
            className="fixed top-8 right-8 z-[60] bg-white text-black border-4 border-black p-4 font-display text-4xl uppercase shadow-[6px_6px_0_var(--color-accent)] hover:bg-accent hover:text-white transition-colors"
            style={{ clipPath: 'polygon(10% 0, 100% 10%, 90% 100%, 0 90%)' }}
          >
            Menu
          </motion.button>
        )}
      </AnimatePresence>

      {/* The Main Navigation Overlay */}
      <AnimatePresence>
        {showFullMenu && (
          <motion.nav 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0, transition: { ease: 'easeIn', duration: 0.3 } }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className={`fixed right-0 top-0 h-screen w-full md:w-auto z-50 flex flex-col justify-center items-end pr-8 md:pr-16 gap-6 ${isMenuOpen && !isMainPage ? 'bg-black/80 backdrop-blur-sm w-screen md:w-screen items-center pr-0' : 'pointer-events-none'}`}
          >
            
            {/* Close button if manually opened on another page */}
            {isMenuOpen && (
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="pointer-events-auto absolute top-8 right-8 font-display text-5xl text-white hover:text-accent"
              >
                [ X ]
              </button>
            )}

            {menuItems.map((item, idx) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="pointer-events-auto relative group flex items-center justify-end"
              >
                {/* Jagged highlight block behind the text */}
                <motion.div 
                  className="absolute right-[-5%] w-[110%] h-[120%] bg-[#ff00ff] opacity-0 group-hover:opacity-100 z-[-1] transition-all duration-100" 
                  style={{ clipPath: 'polygon(0 15%, 100% 0, 90% 100%, 10% 85%)' }}
                />
                
                {/* Changed to Teko, styled as white blocks with black text like the reference */}
                <motion.span 
                  whileHover={{ scale: 1.05, rotate: -2, x: -10 }}
                  className={`block font-display text-6xl md:text-[6rem] bg-white text-black border-[6px] border-black px-6 py-2 uppercase tracking-wide ${item.angle} leading-[0.8] shadow-[8px_8px_0_rgba(0,0,0,1)]`}
                  style={{ clipPath: 'polygon(2% 0, 100% 4%, 98% 100%, 0 96%)' }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
            
            <Link to="/cart" className="pointer-events-auto relative group mt-8 flex justify-end">
              <motion.div 
                  className="absolute right-[-5%] w-[110%] h-[120%] bg-[#00ff00] opacity-0 group-hover:opacity-100 z-[-1] transition-all duration-100" 
                  style={{ clipPath: 'polygon(10% 0, 100% 20%, 85% 100%, 0 80%)' }}
                />
              <motion.span 
                  whileHover={{ scale: 1.05, rotate: 4, x: -10 }}
                  className={`block font-display text-5xl md:text-[5rem] bg-black text-white border-[6px] border-white px-6 py-2 uppercase tracking-wider rotate-3 leading-[0.8] shadow-[8px_8px_0_var(--color-accent)]`}
                  style={{ clipPath: 'polygon(0 4%, 98% 0, 100% 96%, 2% 100%)' }}
                >
                  Cart [{itemCount}]
                </motion.span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;