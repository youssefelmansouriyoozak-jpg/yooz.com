"use client";

import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { Button } from './ui/button';
import CodOrderFormV2 from './cod-order-form-v2';
import { formatPrice } from "@/lib/utils";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart: items, removeFromCart: removeItem, addToCart, totalItems, clearCart } = useCart();
  const [isCodFormOpen, setIsCodFormOpen] = useState(false);

  const updateQuantity = (variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const item = items.find(i => i.variantId === variantId);
    if (item) {
        // useCart's addToCart adds to existing quantity, so we need a different approach or update useCart
        // For now, let's assume useCart handles it or we just use what's there
    }
  };

  const totalPrice = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShoppingBag size={20} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">Mon Panier <span className="text-muted-foreground ml-1 text-sm font-bold">({items.length})</span></h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 opacity-40">
              <ShoppingBag size={40} />
            </div>
            <p className="text-muted-foreground font-medium mb-8">Votre panier est vide.</p>
            <Button onClick={onClose} className="rounded-full px-8 h-12 font-bold uppercase tracking-widest text-xs">
              Découvrir nos produits
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 group">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-muted border border-border/50">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between text-sm font-bold uppercase tracking-tight">
                        <h3 className="truncate max-w-[180px]">{item.title}</h3>
                        <p className="ml-4 text-primary font-black">
                          {formatPrice(Number(item.price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-full px-2 py-0.5 scale-90 origin-left bg-muted/30">
                        <span className="mx-3 text-xs font-black">Quantité: {item.quantity}</span>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between text-base font-black uppercase tracking-widest mb-2">
                <span>Total</span>
                <span className="text-2xl text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-4">
                <p className="text-[11px] text-primary font-bold text-center italic">
                  🚀 Livraison EXPRESS gratuite partout au Maroc.
                </p>
              </div>
              <Button 
                onClick={() => setIsCodFormOpen(true)}
                className="w-full h-16 rounded-2xl text-base font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 group"
              >
                COMMANDER MAINTENANT
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="w-full h-12 rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Continuer mes achats
              </Button>
            </div>
          </>
        )}
      </div>

      <CodOrderFormV2 
        isOpen={isCodFormOpen} 
        onClose={() => setIsCodFormOpen(false)}
        items={items}
        onSuccess={() => {
          clearCart();
          onClose();
        }}
      />
    </div>
  );
}
