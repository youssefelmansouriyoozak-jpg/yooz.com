"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, ChevronRight } from 'lucide-react';
import { fbEvents } from '@/lib/facebook-pixel';

const NewsletterFooter = () => {
  const [year, setYear] = useState<number | string>('...');
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      fbEvents.lead('newsletter');
      // Reset form
      setEmail('');
    }
  };

  return (
    <footer className="w-full font-sans bg-white border-t border-border">
      {/* Upper Trust Badges Section */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h4 className="text-[14px] font-bold text-foreground mb-1">Paiement sécurisé</h4>
            <p className="text-[12px] text-muted-foreground">Vos données protégées</p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#501111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect><path d="M12 11V15M12 11L9 11M12 11L15 11"></path><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h4 className="text-[14px] font-bold text-foreground mb-1">Livraison offerte</h4>
              <p className="text-[12px] text-muted-foreground">Sans minimum d&apos;achat</p>
            </div>

          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A771F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            </div>
            <h4 className="text-[14px] font-bold text-foreground mb-1">Expédition rapide</h4>
            <p className="text-[12px] text-muted-foreground">L&apos;envoi se fait en 24H</p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 mb-4 bg-muted rounded-full flex items-center justify-center transition-colors group-hover:bg-secondary">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
            <h4 className="text-[14px] font-bold text-foreground mb-1">Shopping tranquille</h4>
            <p className="text-[12px] text-muted-foreground">Retour facile</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-primary text-primary-foreground py-10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-3/5">
              <h3 className="text-[18px] md:text-[22px] font-bold mb-4 flex items-center gap-2">
                <span className="text-[26px]">100 DH offerts</span> en vous abonnant à notre newsletter
              </h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-0 group">
                  <div className="relative flex-grow">
                    <input 
                      type="email" 
                      placeholder="Votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[54px] px-6 text-[16px] text-foreground bg-white/80 border-none focus:bg-white focus:ring-0 transition-all rounded-l-md md:rounded-none md:rounded-l-md"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="h-[54px] w-full sm:w-[60px] flex items-center justify-center bg-white/30 hover:bg-white/40 transition-colors border-l border-white/20 rounded-r-md md:rounded-none md:rounded-r-md"
                  >
                    <ChevronRight size={28} className="text-white" />
                  </button>
                </form>
              <p className="text-[10px] mt-4 opacity-70">
                Code promo non cumulable, valable sur votre première commande dès 500 DH d&apos;achat pendant 48h
              </p>
            </div>

            <div className="w-full md:w-auto text-center md:text-right">
                <h3 className="text-[20px] md:text-[24px] font-bold mb-4">Nos réseaux <span className="underline decoration-2">sociaux</span></h3>
                <div className="flex gap-8 justify-center md:justify-end">
                  <a href="#" onClick={() => fbEvents.contact('facebook')} className="hover:scale-110 transition-transform"><Facebook size={32} strokeWidth={1.5} /></a>
                  <a href="#" onClick={() => fbEvents.contact('instagram')} className="hover:scale-110 transition-transform"><Instagram size={32} strokeWidth={1.5} /></a>
                  <a href="#" onClick={() => fbEvents.contact('youtube')} className="hover:scale-110 transition-transform"><Youtube size={32} strokeWidth={1.5} /></a>
                </div>
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

          {/* SEO-optimized internal links for collections */}
          <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-border pt-12" aria-label="Collections de chaussures">
            <div>
              <h5 className="text-[13px] font-bold uppercase tracking-wider mb-6 text-foreground">Chaussures Femme</h5>
              <ul className="space-y-2 text-[11px] text-muted-foreground">
                <li><a href="/collections/bottes-et-bottines" className="hover:text-primary transition-colors">BOTTINES FEMME</a></li>
                <li><a href="/collections/escarpins-1" className="hover:text-primary transition-colors">ESCARPINS</a></li>
                <li><a href="/collections/sandales" className="hover:text-primary transition-colors">SANDALES FEMME</a></li>
                <li><a href="/collections/mules-1" className="hover:text-primary transition-colors">MULES FEMME</a></li>
                <li><a href="/collections/sabots" className="hover:text-primary transition-colors">SABOTS</a></li>
                <li><a href="/collections/baskets-et-espadrilles" className="hover:text-primary transition-colors">BASKETS FEMME</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[13px] font-bold uppercase tracking-wider mb-6 text-foreground">Chaussures Homme</h5>
              <ul className="space-y-2 text-[11px] text-muted-foreground">
                <li><a href="/collections/mocassins" className="hover:text-primary transition-colors">MOCASSINS HOMME</a></li>
                <li><a href="/collections/derbies" className="hover:text-primary transition-colors">DERBIES HOMME</a></li>
                <li><a href="/collections/baskets-et-espadrilles" className="hover:text-primary transition-colors">SNEAKERS HOMME</a></li>
                <li><a href="/collections/sandales" className="hover:text-primary transition-colors">SANDALES HOMME</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[13px] font-bold uppercase tracking-wider mb-6 text-foreground">Collections Populaires</h5>
              <ul className="space-y-2 text-[11px] text-muted-foreground">
                <li><a href="/collections/nos-arrivages" className="hover:text-primary transition-colors">NOUVEAUTÉS</a></li>
                <li><a href="/collections/best-sellers" className="hover:text-primary transition-colors">BEST SELLERS</a></li>
                <li><a href="/collections/les-bonnes-affaires" className="hover:text-primary transition-colors">PROMOTIONS</a></li>
                <li><a href="/collections/all" className="hover:text-primary transition-colors">TOUTES LES CHAUSSURES</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-foreground mb-1">Nos clients nous font confiance</h4>
              <div className="bg-white p-4 border border-border rounded-md shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-0.5" aria-label="Note de 4.7 sur 5 étoiles">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-5 h-5 bg-primary flex items-center justify-center" aria-hidden="true">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <span className="text-[18px] font-bold text-foreground">4.7<span className="text-[12px] opacity-60 font-normal">/5</span></span>
                </div>
              </div>
            </div>
          </nav>
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
