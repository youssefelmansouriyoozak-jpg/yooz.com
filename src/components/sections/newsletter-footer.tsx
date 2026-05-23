"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const NewsletterFooter = () => {
  const [year, setYear] = useState<number | string>('...');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  return (
    <footer className="w-full font-sans bg-white border-t border-border">
      {/* Upper Trust Badges Section */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4 className="text-[14px] font-bold text-foreground mb-1">Paiement sécurisé</h4>
            <p className="text-[12px] text-muted-foreground">Vos données protégées</p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#501111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
                <path d="M12 11V15M12 11L9 11M12 11L15 11"></path>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4 className="text-[14px] font-bold text-foreground mb-1">Livraison offerte</h4>
            <p className="text-[12px] text-muted-foreground">Sans minimum d&apos;achat</p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A771F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <h4 className="text-[14px] font-bold text-foreground mb-1">Expédition rapide</h4>
            <p className="text-[12px] text-muted-foreground">L&apos;envoi se fait en 24H</p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h4 className="text-[14px] font-bold text-foreground mb-1">Shopping tranquille</h4>
            <p className="text-[12px] text-muted-foreground">Retour facile</p>
          </div>
        </div>
      </div>

      {/* Social Section Centered */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h3 className="text-[32px] md:text-[42px] font-bold mb-10">
              Nos réseaux <span className="underline decoration-2">sociaux</span>
            </h3>

            <div className="flex items-center justify-center gap-10">
              <a href="#" className="hover:scale-110 transition-transform">
                <Facebook size={42} strokeWidth={1.5} />
              </a>

              <a href="#" className="hover:scale-110 transition-transform">
                <Instagram size={42} strokeWidth={1.5} />
              </a>

              <a href="#" className="hover:scale-110 transition-transform">
                <Youtube size={42} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tertiary Footer Links Section */}
      <section className="bg-[#F5F5F5] py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h5 className="text-[13px] font-bold uppercase tracking-wider mb-6 text-foreground">Aide</h5>
              <ul className="space-y-3 text-[12px] text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">CONTACTEZ-NOUS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GUIDE DES TAILLES</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[13px] font-bold uppercase tracking-wider mb-6 text-foreground">Découvrir Yoozak</h5>
              <ul className="space-y-3 text-[12px] text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">QUI SOMMES-NOUS ?</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">NOS ENGAGEMENTS</a></li>
                <li><a href="/blog" className="hover:text-primary transition-colors">NOTRE BLOG</a></li>
                <li><a href="/lookbook" className="hover:text-primary transition-colors">LOOKBOOK</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[13px] font-bold uppercase tracking-wider mb-6 text-foreground">Nos engagements</h5>
              <ul className="space-y-3 text-[12px] text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">CONDITION DE REMBOURSEMENT</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">RETOUR FACILE</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LIVRAISON EXPRESS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LIVRAISON GRATUITE</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">PAYEZ EN TOUTE SÉCURITÉ</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[13px] font-bold uppercase tracking-wider mb-6 text-foreground">Informations</h5>
              <ul className="space-y-3 text-[12px] text-muted-foreground mb-6">
                <li><a href="#" className="hover:text-primary transition-colors">CGV</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">POLITIQUE DE CONFIDENTIALITÉ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-[#E6E6E6] overflow-hidden select-none pointer-events-none pb-8 flex justify-center items-center py-10 border-t border-white/20">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766579468216.png?width=800&height=200&resize=contain"
          alt="YOOZAK"
          width={400}
          height={100}
          className="opacity-10 grayscale"
        />
      </div>

      <div className="bg-[#E6E6E6] px-4 py-4 text-[10px] text-muted-foreground text-center border-t border-white/20">
        &copy; {mounted ? year : '...'} YOOZAK. TOUS DROITS RÉSERVÉS.
      </div>
    </footer>
  );
};

export default NewsletterFooter;