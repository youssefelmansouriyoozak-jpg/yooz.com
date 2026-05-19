"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Zap, AlertCircle, Star, ChevronDown, ChevronUp, Truck, ShieldCheck, ArrowLeftRight, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { ShareButton } from '@/components/ui/share-button';
import { toast } from 'sonner';
import CodOrderFormV2 from './cod-order-form-v2';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { fbEvents } from '@/lib/facebook-pixel';

const SIZE_NAMES = ['size', 'pointure', 'القياس', 'taille'];
const COLOR_NAMES = ['color', 'couleur', 'الألوان', 'لون'];

export default function ProductPageClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isCodFormOpen, setIsCodFormOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const price = formatPrice(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount;
  const hasCompareAtPrice = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(product.priceRange.minVariantPrice.amount);
  const images = product.images?.edges || [];
  const currentImage = images[selectedImageIndex]?.node;

  // Track ViewContent when product page loads
  useEffect(() => {
    fbEvents.viewContent({
      id: product.id,
      name: product.title,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
    });
  }, [product.id, product.title, product.priceRange.minVariantPrice.amount]);

  useEffect(() => {
    const descEl = descriptionRef.current;
    if (!descEl) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = descEl;
      const isScrollable = scrollHeight > clientHeight;
      
      if (!isScrollable) return;

      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return;
      }

      e.stopPropagation();
    };

    descEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => descEl.removeEventListener('wheel', handleWheel);
  }, [showDescription]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const categorizedOptions = useMemo(() => {
    const options = product.options || [];
    const sizeOption = options.find((o: any) => 
      SIZE_NAMES.some(name => o.name.toLowerCase().includes(name.toLowerCase()))
    );
    const colorOption = options.find((o: any) => 
      COLOR_NAMES.some(name => o.name.toLowerCase().includes(name.toLowerCase()))
    );
    const otherOptions = options.filter((o: any) => 
      !SIZE_NAMES.some(name => o.name.toLowerCase().includes(name.toLowerCase())) &&
      !COLOR_NAMES.some(name => o.name.toLowerCase().includes(name.toLowerCase()))
    );
    
    return { sizeOption, colorOption, otherOptions };
  }, [product.options]);

  const selectedVariant = useMemo(() => {
    const allOptionsSelected = product.options?.every((opt: any) => selectedOptions[opt.name]);
    if (!allOptionsSelected) return null;

    return product.variants.edges.find((edge: any) => {
      return edge.node.selectedOptions.every((opt: any) => 
        selectedOptions[opt.name] === opt.value
      );
    })?.node;
  }, [selectedOptions, product.variants.edges, product.options]);

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
    setShowErrors(false);
  };

  const validateSelection = () => {
    const allSelected = product.options?.every((opt: any) => selectedOptions[opt.name]);
    if (!allSelected) {
      setShowErrors(true);
      toast.error("Veuillez sélectionner toutes les options");
      return false;
    }
    if (!selectedVariant) {
      toast.error("Cette combinaison n'est pas disponible");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    
    addToCart({
      id: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      price: product.priceRange.minVariantPrice.amount,
      quantity: 1,
      image: product.images.edges[0]?.node.url,
    });
    
    // Track AddToCart
    fbEvents.addToCart({
      id: product.id,
      name: product.title,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      quantity: 1,
    });
    
    toast.success("Produit ajouté au panier");
  };

  const handleFastBuy = () => {
    if (!validateSelection()) return;
    
    // Track InitiateCheckout
    fbEvents.initiateCheckout({
      ids: [product.id],
      value: parseFloat(product.priceRange.minVariantPrice.amount),
      numItems: 1,
    });
    
    setIsCodFormOpen(true);
  };

  const quickOrderItem = selectedVariant ? [{
    variantId: selectedVariant.id,
    title: product.title,
    price: product.priceRange.minVariantPrice.amount,
    quantity: 1,
    image: product.images.edges[0]?.node.url,
  }] : [];

  const hasOptions = product.options && product.options.length > 0 && 
    !(product.options.length === 1 && product.options[0].values.length === 1);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const renderCompactOption = (option: any) => {
    if (!option) return null;
    const isSelected = !!selectedOptions[option.name];
    const hasError = showErrors && !isSelected;

    return (
      <div key={option.name} className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider">{option.name}</span>
          {selectedOptions[option.name] && (
            <span className="text-xs text-primary font-semibold">: {selectedOptions[option.name]}</span>
          )}
          {hasError && <AlertCircle size={14} className="text-red-500" />}
        </div>
        <div className={`flex flex-wrap gap-2 ${hasError ? 'animate-pulse' : ''}`}>
          {option.values.map((value: string) => (
            <button
              key={value}
              onClick={() => handleOptionSelect(option.name, value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedOptions[option.name] === value
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-white hover:border-primary/50'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 pb-40">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-120px)] w-full overflow-hidden">
              <div className="flex gap-3 h-full">
                {images.length > 1 && (
                  <div className="hidden md:flex flex-col gap-2 overflow-y-auto py-1" style={{ scrollbarWidth: 'none' }}>
                    {images.map((edge: any, i: number) => (
                      <button
                        key={edge.node.url}
                        onClick={() => setSelectedImageIndex(i)}
                        className={cn(
                          "relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                          selectedImageIndex === i 
                            ? "border-primary ring-2 ring-primary/20" 
                            : "border-border/50 hover:border-primary/50"
                        )}
                      >
                        <Image
                          src={edge.node.url}
                          alt={edge.node.altText || `${product.title} - ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex-1 flex flex-col min-w-0">
                  <div className="relative w-full aspect-square lg:aspect-auto lg:h-full overflow-hidden rounded-2xl bg-white border border-border/50 group">
                  <Image
                    src={currentImage?.url || ''}
                    alt={currentImage?.altText || product.title}
                    fill
                    className="object-contain p-4 md:p-8"
                    priority
                  />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-primary text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">Nouveauté</span>
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg items-center justify-center hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg items-center justify-center hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={18} />
                      </button>
                      <button
                        onClick={handlePrevImage}
                        className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center active:scale-95 transition-transform z-10"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center active:scale-95 transition-transform z-10"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                  {images.length > 1 && (
                    <div className="md:hidden flex gap-2 mt-3 overflow-x-auto pb-2 w-full" style={{ scrollbarWidth: 'none' }}>
                      {images.map((edge: any, i: number) => (
                        <button
                          key={edge.node.url}
                          onClick={() => setSelectedImageIndex(i)}
                          className={cn(
                            "relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                            selectedImageIndex === i 
                              ? "border-primary ring-2 ring-primary/20" 
                              : "border-border/50"
                          )}
                        >
                          <Image
                            src={edge.node.url}
                            alt={edge.node.altText || `${product.title} - ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="lg:w-[45%] lg:sticky lg:top-20 lg:h-[calc(100vh-120px)] flex flex-col">
            <div className="bg-[#FBFBFB] pb-4">
<div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="fill-primary text-primary" />
                  ))}
                  <span className="text-[10px] font-semibold ml-1.5 text-muted-foreground">(124 avis)</span>
                </div>
                
                <h1 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight mb-2 leading-tight">
                  {product.title}
                </h1>
                
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xl md:text-2xl font-black text-primary">{price}</span>
                  {hasCompareAtPrice && (
                    <span className="text-muted-foreground line-through text-sm opacity-50 font-semibold">
                      {formatPrice(compareAtPrice)}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <ShareButton variant="product" title={product.title} description={`Découvrez ${product.title} sur YOOZAK - ${price}`} />
                </div>

              <div className="grid gap-2 py-3 border-t border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-primary" />
                  <span className="text-xs text-foreground font-medium">Livraison gratuite en 24h partout au Maroc</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-primary" />
                  <span className="text-xs text-foreground font-medium">Paiement à la livraison</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowLeftRight size={16} className="text-primary" />
                  <span className="text-xs text-foreground font-medium">Échange gratuit sous 7 jours</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-border/50 hover:border-primary/30 transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider">Voir les détails du produit</span>
                {showDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {showDescription && (
              <div className="mt-3 flex-1 min-h-0 overflow-hidden rounded-xl bg-white border border-border/50 animate-in slide-in-from-top-2 duration-200">
                <div 
                  ref={descriptionRef}
                  className="h-full overflow-y-auto overscroll-contain p-4"
                  style={{ scrollbarWidth: 'thin', maxHeight: 'calc(100vh - 400px)' }}
                >
                  <div className="prose prose-sm max-w-none text-muted-foreground text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {hasOptions && (
              <div className="flex-1 flex flex-wrap gap-4">
                {renderCompactOption(categorizedOptions.colorOption)}
                {renderCompactOption(categorizedOptions.sizeOption)}
                {categorizedOptions.otherOptions.map((opt: any) => renderCompactOption(opt))}
              </div>
            )}

            <div className="flex gap-3 md:min-w-[320px]">
              <Button 
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-12 rounded-full text-sm font-bold border-2 border-foreground"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">PANIER</span>
              </Button>
              <Button 
                onClick={handleFastBuy}
                className="flex-[2] h-12 rounded-full text-sm font-bold bg-primary hover:bg-primary/90"
              >
                <Zap className="mr-2 h-4 w-4 fill-current" />
                COMMANDER MAINTENANT
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CodOrderFormV2 
        isOpen={isCodFormOpen} 
        onClose={() => setIsCodFormOpen(false)}
        items={quickOrderItem}
      />
    </>
  );
}
