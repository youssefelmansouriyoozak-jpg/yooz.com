"use client";

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, Phone, User, MapPin, ShoppingCart, PartyPopper, Tag, Store } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
import { fbEvents } from '@/lib/facebook-pixel';

interface CodOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onSuccess?: () => void;
}

const CodOrderFormV2 = ({ isOpen, onClose, items, onSuccess }: CodOrderFormProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
  });

  useEffect(() => {
    if (success) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FF0000', '#FFD700', '#00FF00', '#0000FF', '#FF00FF']
        });
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FF0000', '#FFD700', '#00FF00', '#0000FF', '#FF00FF']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout/cod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, promoCode, items }),
      });

      const data = await response.json();

        if (data.success) {
          setSuccess(true);
          toast.success("Commande reçue !");
          
          // Track Purchase event
          const totalValue = items.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
          fbEvents.purchase({
            ids: items.map(item => item.variantId),
            value: totalValue,
            numItems: items.reduce((sum, item) => sum + (item.quantity || 1), 0),
          });
          
          // Realistic confetti burst immediately
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF0000', '#FFD700', '#22C55E']
          });

// No auto-close - user will click the button to go to shop
        } else {
        toast.error(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-xl p-0 border-none bg-transparent shadow-none overflow-y-auto max-h-[95vh] scrollbar-hide">
        <DialogTitle className="sr-only">Formulaire de commande</DialogTitle>
        <DialogDescription className="sr-only">
          Remplissez vos informations pour finaliser votre commande en paiement à la livraison.
        </DialogDescription>
        <div className="bg-white w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20 relative my-4">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-muted transition-all hover:rotate-90 duration-300 z-10 bg-white/80 backdrop-blur-sm shadow-sm md:shadow-none"
          >
            <X size={18} className="text-muted-foreground" />
          </button>

{success ? (
              <div className="p-8 md:p-12 flex flex-col items-center text-center bg-gradient-to-b from-green-50/50 to-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-10 left-10 animate-bounce duration-[3000ms]">
                    <PartyPopper className="text-green-600" size={40} />
                  </div>
                  <div className="absolute bottom-10 right-10 animate-bounce duration-[2500ms]">
                    <PartyPopper className="text-green-600" size={40} />
                  </div>
                </div>

                <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 md:mb-8 text-white shadow-2xl shadow-green-200 animate-in zoom-in duration-500">
                  <CheckCircle2 size={32} className="md:size-[48px] animate-pulse" />
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-3 md:mb-4 text-foreground animate-in slide-in-from-bottom-4 duration-700">
                  Merci ! 🎉
                </h3>
                
                <div className="h-1 w-16 md:w-20 bg-primary/20 rounded-full mb-4 md:mb-6 mx-auto" />

                <h4 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2 text-green-600">Commande Confirmée</h4>
                
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm font-medium mb-4 px-4">
                  Notre service client vous contactera très prochainement pour prendre soin de votre commande et confirmer les détails de livraison.
                </p>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 md:p-5 rounded-2xl border border-primary/20 w-full max-w-xs mb-4 animate-in slide-in-from-bottom-6 duration-800">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary mb-2">Offre Exclusive</p>
                  <p className="text-xs md:text-sm font-bold text-foreground leading-snug">
                    Bénéficiez d&apos;une réduction remarquable sur l&apos;achat d&apos;un 2ème article !
                  </p>
                </div>

<button 
                    type="button"
                    onClick={() => {
                      if (onSuccess) onSuccess();
                      setSuccess(false);
                      setPromoCode('');
                      setFormData({ firstName: '', lastName: '', phone: '', city: '', address: '' });
                      onClose();
                      window.location.href = '/collections/all';
                    }}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 animate-in slide-in-from-bottom-8 duration-1000"
                  >
                    <Store size={16} />
                    Découvrir la Boutique
                  </button>
              </div>
            ) : (
            <div className="p-6 md:p-12">
              <div className="mb-6 md:mb-10">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary">
                    <ShoppingCart size={16} className="md:size-[20px] stroke-[2.5]" />
                  </div>
                  <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Finaliser la commande</h2>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-muted/50 rounded-full w-fit">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Paiement à la livraison uniquement</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                      <User size={10} className="md:size-[12px] text-primary" /> Prénom
                    </label>
                    <input 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full h-12 md:h-14 px-5 md:px-6 rounded-xl md:rounded-2xl border-2 border-transparent bg-muted/50 focus:bg-white focus:border-primary/20 transition-all text-sm font-bold outline-none ring-0 placeholder:font-medium placeholder:text-muted-foreground/40"
                      placeholder="Ex: Ahmed"
                    />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                      <User size={10} className="md:size-[12px] text-primary" /> Nom
                    </label>
                    <input 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full h-12 md:h-14 px-5 md:px-6 rounded-xl md:rounded-2xl border-2 border-transparent bg-muted/50 focus:bg-white focus:border-primary/20 transition-all text-sm font-bold outline-none ring-0 placeholder:font-medium placeholder:text-muted-foreground/40"
                      placeholder="Ex: Alaoui"
                    />
                  </div>
                </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                        <Phone size={10} className="md:size-[12px] text-primary" /> Téléphone
                      </label>
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-12 md:h-14 px-5 md:px-6 rounded-xl md:rounded-2xl border-2 border-transparent bg-muted/50 focus:bg-white focus:border-primary/20 transition-all text-sm font-bold outline-none ring-0 placeholder:font-medium placeholder:text-muted-foreground/40"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                        <Tag size={10} className="md:size-[12px] text-primary" /> Code Promo <span className="text-[8px] md:text-[9px] opacity-60 font-medium">(Optionnel)</span>
                      </label>
                      <input 
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="w-full h-12 md:h-14 px-5 md:px-6 rounded-xl md:rounded-2xl border-2 border-transparent bg-muted/50 focus:bg-white focus:border-primary/20 transition-all text-sm font-bold outline-none ring-0 placeholder:font-medium placeholder:text-muted-foreground/40 uppercase"
                        placeholder="YOOZAK10"
                      />
                    </div>
                  </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                    <MapPin size={10} className="md:size-[12px] text-primary" /> Ville
                  </label>
                  <input 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full h-12 md:h-14 px-5 md:px-6 rounded-xl md:rounded-2xl border-2 border-transparent bg-muted/50 focus:bg-white focus:border-primary/20 transition-all text-sm font-bold outline-none ring-0 placeholder:font-medium placeholder:text-muted-foreground/40"
                    placeholder="Ex: Casablanca"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                    <MapPin size={10} className="md:size-[12px] text-primary" /> Adresse complète
                  </label>
                  <textarea 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full h-24 md:h-32 px-5 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl border-2 border-transparent bg-muted/50 focus:bg-white focus:border-primary/20 transition-all text-sm font-bold outline-none ring-0 resize-none placeholder:font-medium placeholder:text-muted-foreground/40"
                    placeholder="Numéro de rue, quartier, immeuble..."
                  />
                </div>

                <div className="pt-4 md:pt-6">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 md:h-16 rounded-full text-sm md:text-base font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-[0_15px_30px_-10px_rgba(var(--primary-rgb),0.4)] md:shadow-[0_20px_40px_-12px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-[0.98] disabled:opacity-70 group"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <span className="flex items-center gap-3">
                        Commander Maintenant
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <X size={12} className="rotate-45" />
                        </div>
                      </span>
                    )}
                  </Button>
                  <div className="mt-4 md:mt-6 flex flex-col items-center gap-2">
                    <p className="text-[9px] md:text-[10px] text-center text-muted-foreground font-medium max-w-[280px]">
                      En confirmant, vous acceptez d&apos;être contacté par notre service client pour la validation de livraison.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodOrderFormV2;
