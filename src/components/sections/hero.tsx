"use client";

import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import TrustBar from './trust-bar';

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroImage = "https://wjnerekpjeqqbejnvjcd.supabase.co/storage/v1/object/sign/Yoozak/Sabot_Couleur_CozyHome.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWNhYzI0Yi01NjM0LTQ3ZGMtOTI0Yi1lMzY0ZThiODIwZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJZb296YWsvU2Fib3RfQ291bGV1cl9Db3p5SG9tZS5qcGciLCJpYXQiOjE3Njg4NTQxNTMsImV4cCI6NDM2MDg1NDE1M30.4uo0ToSWmeLkE9R4vCusVwHPAr3ElVmZvVsuUtCcALs";

  if (!mounted) {
    return <div className="h-[280px] md:h-[56.25vw] bg-muted animate-pulse" aria-hidden="true" />;
  }

  return (
    <section className="relative w-full overflow-hidden bg-white" aria-label="Bannière principale">
      {/* Fixed Image Hero */}
      <div className="relative h-[280px] md:h-[56.25vw] w-full group">
<div 
          className="absolute inset-0 bg-no-repeat bg-cover bg-left md:bg-cover md:bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }}
          role="img"
          aria-label="Collection de sabots colorés YOOZAK - Nouvelle collection 2026"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent md:from-white/80 md:via-white/20 md:to-transparent" aria-hidden="true" />

        {/* Content Container */}
        <div className="absolute inset-0 z-10">
          <div className="container h-full flex flex-col justify-center max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="max-w-[650px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6 animate-in fade-in slide-in-from-bottom duration-500">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Nouvelle Collection 2026</span>
              </div>
              
              <h1 className="editorial-title text-[#1D1D1B] text-[32px] md:text-[72px] lg:text-[84px] leading-[0.9] mb-8 font-black uppercase tracking-tighter animate-in fade-in slide-in-from-left duration-700">
                L'élégance <br />
                <span className="italic font-light lowercase opacity-80">à chaque pas</span>
              </h1>

              <div className="w-[80px] md:w-[100px] h-[3px] md:h-[4px] bg-primary mb-8 md:mb-10" />

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <a 
                    href="/collections/all"
                    className="group flex items-center gap-2 md:gap-3 bg-primary text-white px-6 md:px-10 py-3.5 md:py-5 rounded-full text-[10px] md:text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 shadow-[0_20px_40px_-12px_rgba(var(--primary-rgb),0.4)] active:scale-95"
                    aria-label="Découvrir la nouvelle collection de chaussures"
                  >
                    Découvrir
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      <TrustBar />
    </section>
  );
};

export default HeroSection;
