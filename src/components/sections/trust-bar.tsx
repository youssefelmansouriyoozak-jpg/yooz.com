"use client";

import React from 'react';
import { Check, ShoppingBasket, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBar = () => {
  const trustItems = [
    {
      icon: <Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white stroke-[3]" />,
      title: 'Livraison offerte',
    },
    {
      icon: <ShoppingBasket className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white" />,
      title: 'Qualité Premium',
    },
    {
      icon: <Percent className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white" />,
      title: 'Prix Juste',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-1 md:py-2">
      {/* Animated Garnet Background */}
      <motion.div 
        className="absolute inset-0 bg-[#501111]"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(-45deg, #501111, #6e1919, #501111, #3d0d0d)",
          backgroundSize: "400% 400%",
        }}
      />
      
      <div className="container relative z-10 mx-auto px-2 max-w-[1200px]">
        <div className="flex flex-row justify-center items-center gap-2 md:gap-16 lg:gap-32">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-1 md:space-x-2"
            >
              <div className="flex-shrink-0 flex items-center justify-center bg-white/10 rounded-full p-[1px] md:p-1">
                {item.icon}
              </div>
              <h3 className="text-[7px] md:text-[11px] font-black text-white uppercase tracking-[0.1em] whitespace-nowrap">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
