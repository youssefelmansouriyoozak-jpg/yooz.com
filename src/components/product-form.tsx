"use client";

import React, { useState, useMemo } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Zap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import CodOrderFormV2 from './cod-order-form-v2';


const SIZE_NAMES = ['size', 'pointure', 'القياس', 'taille'];
const COLOR_NAMES = ['color', 'couleur', 'الألوان', 'لون'];

export default function ProductForm({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isCodFormOpen, setIsCodFormOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);

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
    toast.success("Produit ajouté au panier");
  };

  const handleFastBuy = () => {
    if (!validateSelection()) return;
    setIsCodFormOpen(true);
  };

  const quickOrderItem = selectedVariant ? [{
    variantId: selectedVariant.id,
    title: product.title,
    price: product.priceRange.minVariantPrice.amount,
    quantity: 1,
    image: product.images.edges[0]?.node.url,
  }] : [];

  const renderOptionSelector = (option: any) => {
    if (!option) return null;
    const isSelected = !!selectedOptions[option.name];
    const hasError = showErrors && !isSelected;

    return (
      <div key={option.name} className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-black uppercase tracking-widest text-foreground">
            {option.name}
            {selectedOptions[option.name] ? (
              <span className="ml-2 text-primary normal-case tracking-normal font-bold">: {selectedOptions[option.name]}</span>
            ) : (
              <span className="ml-2 text-muted-foreground normal-case tracking-normal font-medium text-xs">— Choisissez une option</span>
            )}
          </label>
          {hasError && (
            <span className="flex items-center gap-1 text-xs text-red-500 font-bold animate-pulse">
              <AlertCircle size={14} />
              Requis
            </span>
          )}
        </div>
        <div className={`flex flex-wrap gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${hasError ? 'border-red-400 bg-red-50 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'border-border bg-muted/50'}`}>
          {option.values.map((value: string) => (
            <button
              key={value}
              onClick={() => handleOptionSelect(option.name, value)}
              className={`px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                selectedOptions[option.name] === value
                  ? 'border-primary bg-primary text-white shadow-lg scale-105'
                  : 'border-border bg-white hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const hasOptions = product.options && product.options.length > 0 && 
    !(product.options.length === 1 && product.options[0].values.length === 1);

  return (
    <div className="space-y-6">
      {hasOptions && (
        <div className="space-y-5">
          {renderOptionSelector(categorizedOptions.colorOption)}
          {renderOptionSelector(categorizedOptions.sizeOption)}
          {categorizedOptions.otherOptions.map((opt: any) => renderOptionSelector(opt))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button 
          onClick={handleAddToCart}
          className="flex-1 h-12 md:h-14 rounded-full text-sm md:text-base font-bold bg-foreground hover:bg-foreground/90 text-background"
        >
          <ShoppingBag className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          AJOUTER AU PANIER
        </Button>
        <Button 
          onClick={handleFastBuy}
          variant="outline"
          className="flex-1 h-12 md:h-14 rounded-full text-sm md:text-base font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5 fill-current" />
          COMMANDE RAPIDE
        </Button>
      </div>

      <CodOrderFormV2 
        isOpen={isCodFormOpen} 
        onClose={() => setIsCodFormOpen(false)}
        items={quickOrderItem}
      />
    </div>
  );
}
