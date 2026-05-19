"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const PromoCards = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

    if (!mounted) {
    return (
      <section className="py-4 md:py-8 bg-[#FBFBFB]">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
            <div className="h-[200px] md:h-[400px] bg-muted rounded-[1.5rem] md:rounded-[2.5rem] animate-pulse" />
            <div className="h-[200px] md:h-[400px] bg-muted rounded-[1.5rem] md:rounded-[2.5rem] animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 md:py-8 bg-[#FBFBFB]" aria-label="Promotions et collections populaires">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
          {/* Liquidation Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] h-[220px] md:h-[400px] flex flex-col justify-end p-4 md:p-12 text-white shadow-2xl"
            >
            {/* Background Animation Element */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute -top-20 -right-20 w-32 md:w-64 h-32 md:h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-md rounded-full mb-3 md:mb-6">
                <Zap className="w-3 h-3 md:w-[18px] md:h-[18px] text-yellow-400 fill-yellow-400 animate-pulse" aria-hidden="true" />
                <span className="text-[8px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">Liquidation</span>
              </div>
              
              <h2 className="text-xl md:text-5xl font-black uppercase tracking-tighter mb-2 md:mb-4 leading-[0.9]">
                Jusqu'à <br />
                <span className="text-white italic font-light lowercase">-50%</span>
              </h2>
              
              <p className="text-white/80 font-medium mb-4 md:mb-8 max-w-[280px] text-[10px] md:text-base hidden sm:block">
                Sélection exclusive. Ne manquez pas votre chance.
              </p>

              <a 
                href="/collections/liquidation"
                className="inline-flex items-center gap-2 md:gap-3 bg-white text-[#501111] px-4 md:px-8 py-2 md:py-4 rounded-full text-[8px] md:text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all duration-300 group-hover:gap-5"
                aria-label="Voir les promotions jusqu'à -50%"
              >
                Profiter
                <ChevronRight className="w-3 h-3 md:w-[18px] md:h-[18px]" aria-hidden="true" />
              </a>
            </div>

            {/* Floating Element Animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-2 hidden md:block"
              aria-hidden="true"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-3xl -rotate-12">
                <span className="text-6xl font-black">-50%</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Best Sellers Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#722F37] h-[220px] md:h-[400px] flex flex-col justify-end p-4 md:p-12 shadow-xl border border-black/5"
          >
            {/* Background Animation Element */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-20 -left-20 w-40 md:w-80 h-40 md:h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

<div className="relative z-10 text-white">
                <div className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/10 rounded-full mb-3 md:mb-6">
                  <TrendingUp className="w-3 h-3 md:w-[18px] md:h-[18px] text-white" aria-hidden="true" />
                  <span className="text-[8px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-white">Préférés</span>
                </div>
                
                <h2 className="text-xl md:text-5xl font-black uppercase tracking-tighter mb-2 md:mb-4 leading-[0.9] text-white">
                  Best <br />
                  <span className="text-white/80 italic font-light lowercase">sellers</span>
                </h2>
                
                <p className="text-white/70 font-medium mb-4 md:mb-8 max-w-[280px] text-[10px] md:text-base hidden sm:block">
                  Les modèles les plus plébiscités cette saison.
                </p>

                <a 
                  href="/collections/best-sellers"
                  className="inline-flex items-center gap-2 md:gap-3 bg-white text-[#722F37] px-4 md:px-8 py-2 md:py-4 rounded-full text-[8px] md:text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all duration-300 group-hover:gap-5"
                  aria-label="Voir les chaussures best sellers"
                >
                  Voir
                  <ChevronRight className="w-3 h-3 md:w-[18px] md:h-[18px]" aria-hidden="true" />
                </a>
              </div>

            {/* Icon Animation */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 md:top-12 right-4 md:right-12 opacity-5 pointer-events-none"
              aria-hidden="true"
            >
              <TrendingUp className="w-20 h-20 md:w-[200px] md:h-[200px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoCards;
