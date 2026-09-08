import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';

const intelFaqs = [
  { q: "WHAT IS THE PHANTOM DELIVERY PROTOCOL?", a: "All assets are packaged in heavy-duty matte black containers with tamper-evident security seals. Standard extraction takes 3-5 operational days." },
  { q: "ARE RETURNS ACCEPTED?", a: "If an item does not match your target specifications, you may initiate a return protocol within 14 days of receipt. Items must remain unwashed and unworn." },
  { q: "WHERE ARE ASSETS CONSTRUCTED?", a: "Every piece is manufactured using heavy-gauge French terry and ripstop fabrics engineered to withstand extreme urban conditions." }
];

export const Intel = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [tipSent, setTipSent] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-black relative overflow-hidden pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.05] z-0 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-12 relative z-10 pt-32 lg:pt-40">
        
        {/* Header */}
        <div className="mb-16 relative">
          <div className="bg-white text-black font-chaos text-3xl uppercase tracking-widest px-4 py-1 mb-2 w-fit rotate-[-2deg] border-4 border-black">
            CLASSIFIED // 03
          </div>
          <h1 className="font-display text-8xl md:text-[9rem] uppercase tracking-tighter text-white leading-[0.8]" style={{ textShadow: '8px 8px 0px var(--color-accent)' }}>
            MISSION <span className="text-accent bg-black px-4" style={{ WebkitTextStroke: '2px white' }}>INTEL</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: FAQs (Classified Briefings) */}
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-5xl text-white uppercase tracking-wider mb-2">Operational Briefings</h2>
            
            {intelFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-[#18181b] border-4 border-white shadow-[6px_6px_0_var(--color-accent)]">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left font-display text-3xl text-white uppercase flex justify-between items-center hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-chaos text-2xl">{isOpen ? '[-]x' : '[+]'}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 border-t-2 border-gray-800"
                      >
                        <p className="font-sans text-lg text-gray-300 mt-4 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Submit a Tip / Secure Contact */}
          <div className="bg-[#18181b] border-4 border-white p-8 shadow-[12px_12px_0_var(--color-accent)] relative rotate-[1deg]">
            <div className="absolute -top-6 -left-6 bg-accent text-white font-chaos text-3xl px-4 py-1 border-4 border-black rotate-[-4deg]">
              SECURE DISPATCH
            </div>

            {tipSent ? (
              <div className="py-16 text-center flex flex-col items-center">
                <span className="font-display text-6xl text-white uppercase">Transmission Received</span>
                <p className="font-sans text-xl text-gray-400 mt-4">The syndicate has logged your communication.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setTipSent(true); }} className="flex flex-col gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="font-display text-2xl uppercase text-white tracking-widest">Codename / Alias</label>
                  <input type="text" required placeholder="JOKER" className="bg-black border-4 border-gray-700 text-white p-4 font-display text-2xl uppercase tracking-widest focus:border-white focus:outline-none skew-x-[-2deg]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-display text-2xl uppercase text-white tracking-widest">Encrypted Transmission</label>
                  <textarea rows={4} required placeholder="State your inquiry..." className="bg-black border-4 border-gray-700 text-white p-4 font-sans text-lg focus:border-white focus:outline-none skew-x-[-2deg] resize-none" />
                </div>
                <Button type="submit" size="md" className="w-full bg-white text-black border-white hover:bg-accent hover:text-white mt-4">
                  Transmit Intel
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};