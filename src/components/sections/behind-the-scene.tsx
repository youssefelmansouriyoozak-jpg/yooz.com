"use client";

import React from 'react';
import { Play } from 'lucide-react';

const BehindTheScene: React.FC = () => {
  return (
    <section className="py-8 md:py-14 bg-primary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 text-white">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/10">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Savoir-faire artisanal</span>
            </div>
            
            <h2 className="editorial-title text-white text-[42px] md:text-[68px] lg:text-[80px] leading-[0.9] mb-8 font-black uppercase tracking-tighter">
              Behind the <br />
              <span className="italic font-light lowercase opacity-80 text-[36px] md:text-[58px] lg:text-[70px]">scene</span>
            </h2>

            <div className="w-[80px] h-[4px] bg-white mb-8" />

            <p className="text-white/80 text-base md:text-xl font-medium leading-relaxed max-w-lg mb-10">
              Découvrez les coulisses de la fabrication de vos chaussures préférées. Chaque paire est conçue avec passion, alliant confort absolu et design intemporel.
            </p>

            <button className="group flex items-center gap-4 bg-white text-primary px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/90 transition-all duration-300">
              En savoir plus <Play size={16} className="fill-primary" />
            </button>
          </div>
          
<div className="w-full lg:w-1/2">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/20 group">
                <video 
                  className="w-full h-full object-cover"
                  src="https://wjnerekpjeqqbejnvjcd.supabase.co/storage/v1/object/sign/Yoozak/BHS_Site_provisoire.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWNhYzI0Yi01NjM0LTQ3ZGMtOTI0Yi1lMzY0ZThiODIwZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJZb296YWsvQkhTX1NpdGVfcHJvdmlzb2lyZS5tcDQiLCJpYXQiOjE3Njg4NTk4NzcsImV4cCI6Mjc2ODg4NTk4Nzd9.97val6oxJErEWUo13vBhZANC50uzamdK4eXHlM0lJis"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BehindTheScene;
