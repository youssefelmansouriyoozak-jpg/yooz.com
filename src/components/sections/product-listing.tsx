'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronDown, Filter, X, SlidersHorizontal } from 'lucide-react';
import { formatPrice, getColorHex } from '@/lib/utils';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger,
  DrawerFooter
} from '@/components/ui/drawer';

interface Collection {
  title: string;
  handle: string;
}

interface ProductListingProps {
  initialProducts: any[];
  collections?: Collection[];
  currentCollectionHandle?: string;
}

const SIZE_NAMES = ['size', 'pointure', 'القياس', 'taille'];
const COLOR_NAMES = ['color', 'couleur', 'الألوان', 'لون'];
const EXCLUDED_COLLECTIONS = ['bonnes affaires', 'nos arrivages', 'best sellers', 'best-sellers'];

export default function ProductListing({ initialProducts, collections = [], currentCollectionHandle }: ProductListingProps) {
  const filteredCollections = collections.filter(c => 
    !EXCLUDED_COLLECTIONS.some(excluded => c.title.toLowerCase().includes(excluded) || c.handle.toLowerCase().includes(excluded.replace(' ', '-')))
  );
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getOption = (options: any[], names: string[]) => {
    return options?.find((o: any) => names.some(name => o.name.toLowerCase().includes(name.toLowerCase()) || name.includes(o.name)));
  };

  const types = useMemo(() => {
    const productTypes = initialProducts
      .map(p => p.node.productType)
      .filter((pt): pt is string => pt && pt.trim() !== '');
    const uniqueTypes = [...new Set(productTypes)].sort();
    return ['Tous', ...uniqueTypes];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedType !== 'Tous') {
      result = result.filter(p => {
        const pt = p.node.productType || '';
        return pt === selectedType;
      });
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    }

    return result;
  }, [initialProducts, selectedType, sortBy]);

  return (
    <div className="flex flex-col gap-8">
      {/* Desktop Filters & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-border/50 sticky top-24 z-30 shadow-sm md:flex hidden">
        <div className="flex items-center gap-6">
{filteredCollections.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Collections:</span>
                <div className="flex gap-2">
                  <Link
                    href="/collections/all"
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      !currentCollectionHandle
                        ? 'bg-foreground text-background shadow-lg scale-105'
                        : 'bg-muted/50 text-foreground hover:bg-muted'
                    }`}
                  >
                    Tous
                  </Link>
                  {filteredCollections.slice(0, 5).map(collection => (
                    <Link
                      key={collection.handle}
                      href={`/collections/${collection.handle}`}
                      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        currentCollectionHandle === collection.handle
                          ? 'bg-foreground text-background shadow-lg scale-105'
                          : 'bg-muted/50 text-foreground hover:bg-muted'
                      }`}
                    >
                      {collection.title}
                    </Link>
                  ))}
                  {filteredCollections.length > 5 && (
                    <div className="relative group">
                      <button className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${
                        filteredCollections.slice(5).some(c => c.handle === currentCollectionHandle)
                          ? 'bg-foreground text-background shadow-lg'
                          : 'bg-muted/50 text-foreground hover:bg-muted'
                      }`}>
                        Plus <ChevronDown size={10} />
                      </button>
                      <div className="absolute top-full left-0 mt-2 bg-white border border-border/50 rounded-2xl shadow-xl py-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        {filteredCollections.slice(5).map(collection => (
                          <Link
                            key={collection.handle}
                            href={`/collections/${collection.handle}`}
                            className={`block px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                              currentCollectionHandle === collection.handle
                                ? 'bg-muted text-foreground'
                                : 'hover:bg-muted/50'
                            }`}
                          >
                            {collection.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          
          {filteredCollections.length > 0 && <div className="h-6 w-px bg-border/50" />}
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Filtrer:</span>
            <div className="flex gap-2">
              {types.slice(0, 5).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedType === type 
                      ? 'bg-primary text-white shadow-lg scale-105' 
                      : 'bg-muted/50 text-foreground hover:bg-muted'
                  }`}
                >
                  {type}
                </button>
              ))}
              {types.length > 5 && (
                <select 
                  value={types.includes(selectedType) && types.indexOf(selectedType) >= 5 ? selectedType : ''}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-muted/50 text-foreground px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest outline-none border-none cursor-pointer"
                >
                   <option value="" disabled>Autres...</option>
                   {types.slice(5).map(type => (
                     <option key={type} value={type}>{type}</option>
                   ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Trier par:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-muted/50 text-foreground px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest outline-none border-none cursor-pointer hover:bg-muted transition-colors"
          >
            <option value="featured">En vedette</option>
            <option value="price-asc">Prix: Croissant</option>
            <option value="price-desc">Prix: Décroissant</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Trigger */}
      <div className="md:hidden flex gap-3 sticky top-[80px] z-30 bg-[#FBFBFB]/90 backdrop-blur-md py-4">
        <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DrawerTrigger asChild>
            <button 
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-border/50 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 transition-transform"
            >
              <SlidersHorizontal size={14} /> Filtres {selectedType !== 'Tous' && '•'}
            </button>
          </DrawerTrigger>
          <DrawerContent className="rounded-t-[2.5rem] px-6 pb-10 max-h-[85vh] overflow-y-auto">
            <DrawerHeader className="px-0 mb-6">
              <DrawerTitle className="text-2xl font-black uppercase tracking-tight text-left">Filtres</DrawerTitle>
            </DrawerHeader>

<div className="space-y-8">
                  {filteredCollections.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Collections</h3>
                      <div className="flex flex-wrap gap-2.5">
                        <Link
                          href="/collections/all"
                          onClick={() => setIsFilterOpen(false)}
                          className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            !currentCollectionHandle
                              ? 'bg-foreground text-background shadow-lg scale-105'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          Tous
                        </Link>
                        {filteredCollections.map(collection => (
                          <Link
                            key={collection.handle}
                            href={`/collections/${collection.handle}`}
                            onClick={() => setIsFilterOpen(false)}
                            className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                              currentCollectionHandle === collection.handle
                                ? 'bg-foreground text-background shadow-lg scale-105'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            {collection.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Filtrer par type</h3>
                  {selectedType !== 'Tous' && (
                    <button 
                      onClick={() => setSelectedType('Tous')}
                      className="text-[9px] font-black uppercase tracking-widest text-primary"
                    >
                      Effacer
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedType === type 
                          ? 'bg-primary text-white shadow-lg scale-105' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <DrawerFooter className="px-0 mt-10">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-foreground text-background py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all"
              >
                Voir les produits
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex-1 bg-white border border-border/50 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center outline-none shadow-sm appearance-none"
        >
          <option value="featured">Trier par</option>
          <option value="price-asc">Prix ↑</option>
          <option value="price-desc">Prix ↓</option>
        </select>
      </div>

      {/* Active Filters Display */}
      {selectedType !== 'Tous' && (
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedType('Tous')}
            className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            Type: {selectedType} <X size={10} />
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 gap-y-8 md:gap-y-12">
        {filteredProducts.map((edge: any) => {
          const product = edge.node;
          const price = formatPrice(product.priceRange.minVariantPrice.amount);
          
          const sizes = getOption(product.options, SIZE_NAMES)?.values || [];
          const productColors = getOption(product.options, COLOR_NAMES)?.values || [];

          return (
            <div key={product.id} className="group flex flex-col">
              <a 
                href={`/products/${product.handle}`}
                className="relative aspect-[4/5] mb-4 md:mb-6 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white border border-border/50 block group-hover:shadow-lg transition-all duration-500"
              >
                {product.images.edges[0] && (
                  <div className="absolute inset-0 p-3 md:p-4">
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                
                {/* Hover Quick Action */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                  <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex flex-col gap-2">
                     <div className="flex flex-wrap gap-1 justify-center">
                        {sizes.slice(0, 5).map((v: string) => (
                          <span key={v} className="text-[8px] font-bold px-1.5 py-0.5 bg-foreground/5 rounded text-foreground/70 uppercase">{v}</span>
                        ))}
                        {sizes.length > 5 && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 text-foreground/40">+</span>
                        )}
                     </div>
                     <div className="h-px bg-border/50 w-full" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-foreground text-center">Voir les détails</span>
                  </div>
                </div>
              </a>

              <div className="px-1">
                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                  <div className="flex items-center gap-0.5 md:gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={8} className="fill-primary text-primary md:w-[10px] md:h-[10px]" />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {productColors.slice(0, 4).map((v: string) => (
                      <div 
                        key={v} 
                        className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-border shadow-sm" 
                        style={{ backgroundColor: getColorHex(v) }}
                        title={v} 
                      />
                    ))}
                  </div>
                </div>
                <a href={`/products/${product.handle}`} className="block">
                  <h3 className="text-[11px] md:text-[13px] font-black uppercase tracking-tight truncate mb-0.5 md:mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                </a>
                
                {/* Mobile Size Info */}
                <div className="flex flex-col gap-0.5 md:hidden mb-1">
                  <div className="flex flex-wrap gap-1">
                    {sizes.slice(0, 4).map((v: string) => (
                      <span key={v} className="text-[7px] font-bold text-muted-foreground">{v}</span>
                    ))}
                    {sizes.length > 4 && <span className="text-[7px] font-bold text-muted-foreground">+</span>}
                  </div>
                </div>

                <p className="text-primary font-black text-sm md:text-lg" suppressHydrationWarning>
                  {price}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <div className="inline-flex p-6 bg-muted rounded-full mb-6">
             <Filter size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight mb-2">Aucun résultat</h3>
          <p className="text-muted-foreground font-medium">Essayez de modifier vos filtres pour trouver ce que vous cherchez.</p>
          <button 
            onClick={() => { setSelectedType('Tous'); }}
            className="mt-8 text-primary font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-primary pb-1"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
