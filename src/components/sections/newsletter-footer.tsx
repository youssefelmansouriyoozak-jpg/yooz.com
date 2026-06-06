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
  <a
    href="https://www.facebook.com/yoozakparfum"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <Facebook size={42} strokeWidth={1.5} />
  </a>

  <a
    href="https://urls.fr/N-P9Wj"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <Instagram size={42} strokeWidth={1.5} />
  </a>

  {/* TikTok */}
  <a
    href="https://urls.fr/ZkI1f2"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25h-3.1v13.17a2.83 2.83 0 1 1-2.83-2.83c.31 0 .61.05.89.14V9.77a5.94 5.94 0 1 0 5.94 5.94V8.92a7.9 7.9 0 0 0 4.62 1.48V7.32c-.61 0-1.2-.21-1.76-.63Z" />
    </svg>
  </a>

  {/* WhatsApp */}
  <a
    href="https://urls.fr/PGN6HJ"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.03 0C5.4 0 .03 5.37.03 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.95 11.95 0 0 0 12.03 24C18.66 24 24.03 18.63 24.03 12c0-3.2-1.25-6.2-3.51-8.52ZM12.03 21.82a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.67.96.98-3.57-.24-.37a9.82 9.82 0 1 1 8.29 4.56Zm5.39-7.36c-.29-.14-1.71-.84-1.97-.94-.27-.1-.46-.14-.66.14-.19.29-.76.94-.93 1.13-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.66-1.59-.91-2.18-.24-.57-.49-.49-.66-.5h-.57c-.19 0-.5.07-.76.36-.26.29-1 1-.98 2.44.02 1.44 1.03 2.83 1.17 3.02.14.19 2.03 3.11 4.92 4.36.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33Z" />
    </svg>
  </a>

  <a
    href="https://urls.fr/esWtGN"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
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