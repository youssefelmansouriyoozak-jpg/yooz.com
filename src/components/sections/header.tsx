"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, User, Heart, ShoppingBag, Trash2, Percent, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// SUPPRIMÉ: import CodOrderFormV2 from '@/components/cod-order-form-v2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { cart, totalItems, removeFromCart, clearCart } = useCart();
  // SUPPRIMÉ: const [isCodFormOpen, setIsCodFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [pathname]);

  return (
    <header className="w-full relative z-[70]">
{/* Top Announcement Banner */}
        <div className="bg-[#501111] text-white overflow-hidden">
          {/* Desktop version */}
          <div className="hidden lg:flex max-w-[1200px] mx-auto items-center h-[40px] text-[11px] font-black uppercase tracking-wider relative">
            <div className="w-full flex justify-center items-center text-center px-4 gap-4">
              <Link href="/register" className="hover:opacity-80 transition-opacity flex items-center gap-2">
                <span className="bg-white text-[#501111] px-2 py-0.5 rounded text-[10px]">-10% SUR VOTRE 1ÈRE COMMANDE</span>
                <span>CRÉEZ VOTRE COMPTE MAINTENANT &gt;</span>
              </Link>
            </div>
            <div className="w-full flex justify-center items-center text-center px-4 border-l border-white/20">
              <a href="#" className="hover:underline flex items-center gap-2">
                LIVRAISON GRATUITE PARTOUT AU MAROC
              </a>
            </div>
          </div>
          
          {/* Mobile version with vertical carousel */}
          <div className="lg:hidden h-[40px] relative">
            <div className="absolute inset-0 flex flex-col animate-announcement-slide">
              <div className="h-[40px] flex-shrink-0 flex items-center justify-center px-4 text-[10px] font-black uppercase tracking-wider">
                <Link href="/register" className="flex items-center gap-2">
                  <span className="bg-white text-[#501111] px-2 py-0.5 rounded">-10%</span>
                  <span>CRÉEZ VOTRE COMPTE &gt;</span>
                </Link>
              </div>
              <div className="h-[40px] flex-shrink-0 flex items-center justify-center px-4 text-[10px] font-black uppercase tracking-wider">
                <span>LIVRAISON GRATUITE PARTOUT AU MAROC</span>
              </div>
              <div className="h-[40px] flex-shrink-0 flex items-center justify-center px-4 text-[10px] font-black uppercase tracking-wider">
                <Link href="/register" className="flex items-center gap-2">
                  <span className="bg-white text-[#501111] px-2 py-0.5 rounded">-10%</span>
                  <span>CRÉEZ VOTRE COMPTE &gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      {/* Main Navigation */}
        <div className="bg-white border-b border-[#E6E6E6] sticky top-0 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-0 flex items-center justify-between h-[80px]">
            
              {/* Mobile Menu & Logo */}
              <div className="flex items-center gap-4 lg:gap-10">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden text-[#1D1D1B] hover:text-[#501111] transition-all p-1 z-[80] relative"
                  aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" aria-hidden="true" /> : <Menu className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />}
                </button>
                  <SheetContent side="left" className="w-[300px] p-0 border-none rounded-r-3xl shadow-2xl overflow-hidden">
                  <div className="flex flex-col h-full bg-white">
                    <SheetHeader className="p-8 border-b bg-[#FBFBFB] flex flex-row items-center justify-between space-y-0">
                      <SheetTitle className="text-xl font-black uppercase tracking-widest text-foreground">Menu</SheetTitle>
                      <SheetClose className="rounded-full p-2 hover:bg-muted transition-colors">
                        <X className="w-5 h-5 text-foreground" />
                      </SheetClose>
                    </SheetHeader>
                    
                      <div className="flex-1 overflow-y-auto py-6">
                        <div className="px-6 mb-8">
                          <div className="flex items-center bg-[#F5F5F5] rounded-full px-5 py-3 border border-transparent focus-within:border-[#501111] focus-within:bg-white transition-all shadow-inner">
                            <input 
                              type="text" 
                              placeholder="Chercher..." 
                              className="bg-transparent border-none outline-none text-[13px] w-full text-[#1D1D1B] placeholder:text-[#626262] font-medium"
                            />
                            <Search className="w-4 h-4 text-[#1D1D1B]" />
                          </div>
                        </div>

                        <nav className="flex flex-col text-[13px] font-black uppercase tracking-widest text-[#1D1D1B]">
                          <Link href="/collections/nos-arrivages" className="px-8 py-4 border-b border-[#F0F0F0] hover:bg-[#FBFBFB] hover:text-[#501111] transition-all">Nouvel Arrivage</Link>
                          
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="collections" className="border-b border-[#F0F0F0]">
                              <AccordionTrigger className="px-8 py-4 hover:bg-[#FBFBFB] hover:text-[#501111] transition-all hover:no-underline uppercase tracking-widest text-[13px] font-black">
                                Collections
                              </AccordionTrigger>
                              <AccordionContent className="bg-[#FBFBFB] px-8 py-4">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="font-black mb-3 text-[#1D1D1B] text-[11px] tracking-tight uppercase">Chaussures</h4>
                                    <ul className="space-y-3 text-[12px] text-[#626262] font-medium normal-case">
                                      <li><Link href="/collections/bottes-et-bottines" className="hover:text-[#501111] transition-colors block py-1">Bottes et Bottines</Link></li>
                                      <li><Link href="/collections/baskets-et-espadrilles" className="hover:text-[#501111] transition-colors block py-1">Baskets et Espadrilles</Link></li>
                                      <li><Link href="/collections/escarpins-1" className="hover:text-[#501111] transition-colors block py-1">Escarpins</Link></li>
                                      <li><Link href="/collections/derbies" className="hover:text-[#501111] transition-colors block py-1">Derbies</Link></li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-black mb-3 text-[#1D1D1B] text-[11px] tracking-tight uppercase">Style</h4>
                                    <ul className="space-y-3 text-[12px] text-[#626262] font-medium normal-case">
                                      <li><Link href="/collections/mocassins" className="hover:text-[#501111] transition-colors block py-1">Mocassins</Link></li>
                                      <li><Link href="/collections/sandales" className="hover:text-[#501111] transition-colors block py-1">Sandales</Link></li>
                                      <li><Link href="/collections/mules-1" className="hover:text-[#501111] transition-colors block py-1">Mules</Link></li>
                                      <li><Link href="/collections/sabots" className="hover:text-[#501111] transition-colors block py-1">Sabots</Link></li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-black mb-3 text-[#1D1D1B] text-[11px] tracking-tight uppercase">Accessoires</h4>
                                    <ul className="space-y-3 text-[12px] text-[#626262] font-medium normal-case">
                                      <li><Link href="/collections/sacs" className="hover:text-[#501111] transition-colors block py-1">Sacs</Link></li>
                                    </ul>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                          <Link href="/collections/best-sellers" className="px-8 py-4 border-b border-[#F0F0F0] hover:bg-[#FBFBFB] hover:text-[#501111] transition-all">Best Sellers</Link>
<Link href="/collections/les-bonnes-affaires" className="px-8 py-4 border-b border-[#F0F0F0] hover:bg-[#FBFBFB] hover:text-[#501111] transition-all text-[#501111] flex items-center gap-2">
                              <Percent size={14} /> Nos promotions
                            </Link>
                            <Link href="/lookbook" className="px-8 py-4 border-b border-[#F0F0F0] hover:bg-[#FBFBFB] hover:text-[#501111] transition-all">Lookbook</Link>
                            <Link href="/blog" className="px-8 py-4 border-b border-[#F0F0F0] hover:bg-[#FBFBFB] hover:text-[#501111] transition-all">Blog</Link>

                        
                        <div className="mt-8 px-8">
                          <p className="text-[10px] text-[#626262] mb-4 font-bold opacity-50">Assistance</p>
                          <ul className="space-y-4 text-[12px] normal-case font-medium text-[#1D1D1B]">
                            <li><Link href="/account" className="hover:text-[#501111]">Mon Compte</Link></li>
                            <li><Link href="#" className="hover:text-[#501111]">Suivre ma commande</Link></li>
                            <li><Link href="#" className="hover:text-[#501111]">Contact</Link></li>
                          </ul>
                        </div>
                      </nav>
                    </div>

                    <div className="p-8 bg-[#FBFBFB] border-t border-[#E6E6E6]">
                       <div className="flex items-center gap-4 text-[#1D1D1B]">
                          <a href="#" className="hover:text-[#501111] transition-colors"><User size={20} /></a>
                          <a href="#" className="hover:text-[#501111] transition-colors"><Heart size={20} /></a>
                       </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex-shrink-0">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766579468216.png?width=800&height=200&resize=contain" 
                  alt="YOOZAK" 
                  width={160} 
                  height={45} 
                  className="h-[28px] md:h-[35px] w-auto object-contain"
                  priority
                />
              </Link>

            <nav className="hidden lg:flex items-center space-x-5 text-[11px] font-black uppercase tracking-widest text-[#1D1D1B]">
                <div className="group relative py-8 cursor-pointer">
                  <Link href="/collections/all" className="hover:text-[#501111] transition-colors">Collections</Link>
                  <div className="absolute top-full left-0 w-[650px] bg-white border border-[#E6E6E6] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-10 grid grid-cols-3 gap-10 z-[60] -ml-20 rounded-b-3xl">
                      <div>
                          <h4 className="font-black mb-5 text-[#1D1D1B] text-[13px] tracking-tight">Chaussures</h4>
                          <ul className="space-y-3 text-[12px] text-[#626262] font-medium normal-case">
                              <li><Link href="/collections/bottes-et-bottines" className="hover:text-[#501111] transition-colors">Bottes et Bottines</Link></li>
                              <li><Link href="/collections/baskets-et-espadrilles" className="hover:text-[#501111] transition-colors">Baskets et Espadrilles</Link></li>
                              <li><Link href="/collections/escarpins-1" className="hover:text-[#501111] transition-colors">Escarpins</Link></li>
                              <li><Link href="/collections/derbies" className="hover:text-[#501111] transition-colors">Derbies</Link></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-black mb-5 text-[#1D1D1B] text-[13px] tracking-tight">Style</h4>
                          <ul className="space-y-3 text-[12px] text-[#626262] font-medium normal-case">
                              <li><Link href="/collections/mocassins" className="hover:text-[#501111] transition-colors">Mocassins</Link></li>
                              <li><Link href="/collections/sandales" className="hover:text-[#501111] transition-colors">Sandales</Link></li>
                              <li><Link href="/collections/mules-1" className="hover:text-[#501111] transition-colors">Mules</Link></li>
                              <li><Link href="/collections/sabots" className="hover:text-[#501111] transition-colors">Sabots</Link></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-black mb-5 text-[#1D1D1B] text-[13px] tracking-tight">Accessoires</h4>
                          <ul className="space-y-3 text-[12px] text-[#626262] font-medium normal-case">
                              <li><Link href="/collections/sacs" className="hover:text-[#501111] transition-colors">Sacs</Link></li>
                          </ul>
                      </div>
                  </div>
                </div>
                
                <Link href="/collections/nos-arrivages" className="py-8 hover:text-[#501111] transition-colors">Nouvel Arrivage</Link>
                <Link href="/collections/best-sellers" className="py-8 hover:text-[#501111] transition-colors">Best Sellers</Link>
<Link href="/collections/les-bonnes-affaires" className="py-8 hover:text-[#501111] transition-colors text-[#501111] flex items-center gap-2">
                    <Percent size={14} /> Nos promotions
                  </Link>
                  <Link href="/lookbook" className="py-8 hover:text-[#501111] transition-colors">Lookbook</Link>
                  <Link href="/blog" className="py-8 hover:text-[#501111] transition-colors">Blog</Link>
                </nav>
          </div>

          {/* User, Icons */}
          <div className="flex items-center gap-4 lg:gap-6">
              <Link href="/account" className="text-[#1D1D1B] hover:text-[#501111] transition-all hover:scale-110 active:scale-90 p-1 relative group" aria-label="Mon compte">
                  <User className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </Link>

              <Link href="#" className="text-[#1D1D1B] hover:text-[#501111] transition-all hover:scale-110 active:scale-90 p-1" aria-label="Mes favoris">
                <Heart className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
              </Link>

                <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                  <SheetTrigger asChild>
                    <button 
                      className="text-[#1D1D1B] hover:text-[#501111] transition-all hover:scale-110 active:scale-90 p-1 relative group"
                      aria-label={`Panier - ${totalItems} article${totalItems > 1 ? 's' : ''}`}
                    >
                      <ShoppingBag className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#501111] text-white text-[9px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-white shadow-sm" aria-hidden="true">
                          {totalItems}
                        </span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md p-0 border-none rounded-l-3xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col h-full bg-white">
                      <SheetHeader className="p-8 border-b bg-[#FBFBFB] flex flex-row items-center justify-between space-y-0">
                        <SheetTitle className="text-xl font-black uppercase tracking-widest text-foreground">Votre Sélection</SheetTitle>
                        <SheetClose className="rounded-full p-2 hover:bg-muted transition-colors">
                          <X className="w-5 h-5 text-foreground" />
                        </SheetClose>
                      </SheetHeader>

                    
                    <div className="flex-1 overflow-y-auto p-8">
                      {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                          <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center animate-pulse">
                            <ShoppingBag size={48} className="text-muted-foreground opacity-30" />
                          </div>
                          <div>
                            <p className="text-lg font-black uppercase tracking-tight mb-2">Panier Vide</p>
                            <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">Votre prochaine paire de chaussures vous attend !</p>
                          </div>
                          <Button variant="outline" className="rounded-full px-8 h-12 font-black uppercase tracking-widest text-[10px] border-2 hover:bg-foreground hover:text-white transition-all">
                            Découvrir
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {cart.map((item) => (
                            <div key={item.variantId} className="flex gap-6 group relative">
                              <div className="relative w-24 h-32 flex-shrink-0 bg-muted rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                                {item.image && (
                                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                                )}
                              </div>
                              <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-[13px] font-black uppercase tracking-tight line-clamp-2 leading-tight pr-6">{item.title}</h4>
                                  <button 
                                    onClick={() => removeFromCart(item.variantId)} 
                                    className="absolute top-0 right-0 text-muted-foreground hover:text-destructive transition-colors p-1"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                  <div className="flex items-center justify-between mt-auto">
                                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Qté: {item.quantity}</p>
                                    <p className="font-black text-primary text-base" suppressHydrationWarning>
                                      {formatPrice(Number(item.price) * item.quantity)}
                                    </p>
                                  </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="p-8 bg-[#FBFBFB] border-t border-[#E6E6E6] space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                              <span>Sous-total</span>
                              <span suppressHydrationWarning>
                                {formatPrice(
                                  cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xl font-black uppercase tracking-tight">
                              <span>Total</span>
                              <span className="text-primary" suppressHydrationWarning>
                                {formatPrice(
                                  cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
                                )}
                              </span>
                            </div>
                        </div>

                        {/* CORRECTION: onClick ferme le Sheet header uniquement.
                            Le CodOrderFormV2 est supprimé de ce fichier.
                            Le formulaire COD est géré uniquement dans cart-drawer.tsx
                            et product-page-client.tsx — plus de doublon pixel. */}
                        <Button 
                          onClick={() => setIsCartOpen(false)}
                          className="w-full h-16 rounded-full bg-foreground text-background hover:bg-primary transition-all duration-500 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-foreground/10 active:scale-95"
                        >
                          Passer la commande
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        
        {/* SUPPRIMÉ: <CodOrderFormV2 ... /> — c'était la cause du doublon pixel.
            Cette instance coexistait avec celle de product-page-client.tsx et cart-drawer.tsx.
            Résultat : fbEvents.purchase() était appelé 2-3x pour une seule commande. */}
    </header>
  );
};

export default Header;
