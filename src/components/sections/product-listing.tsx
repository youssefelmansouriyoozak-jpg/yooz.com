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

// ─── helpers ────────────────────────────────────────────────────────────────

function getOption(options: any[], names: string[]) {
  return options?.find((o: any) =>
    names.some(
      (name) =>
        o.name.toLowerCase().includes(name.toLowerCase()) ||
        name.includes(o.name)
    )
  );
}

function isProductAvailable(product: any): boolean {
  // A product is considered available when at least one variant is available for sale
  if (product.availableForSale === false) return false;
  if (Array.isArray(product.variants?.edges)) {
    return product.variants.edges.some(
      (ve: any) => ve.node.availableForSale === true
    );
  }
  // Fallback: rely on the root field
  return product.availableForSale !== false;
}

// ─── FilterPanel sub-component (shared by desktop sidebar & mobile drawer) ──

interface FilterPanelProps {
  // collections
  filteredCollections: Collection[];
  currentCollectionHandle?: string;
  onCloseDrawer?: () => void;
  // type
  types: string[];
  selectedType: string;
  setSelectedType: (v: string) => void;
  // size
  allSizes: string[];
  selectedSizes: string[];
  toggleSize: (v: string) => void;
  // color
  allColors: string[];
  selectedColors: string[];
  toggleColor: (v: string) => void;
  // price
  priceMin: number;
  priceMax: number;
  globalPriceMin: number;
  globalPriceMax: number;
  setPriceMin: (v: number) => void;
  setPriceMax: (v: number) => void;
  // availability
  onlyAvailable: boolean;
  setOnlyAvailable: (v: boolean) => void;
  // reset
  resetFilters: () => void;
  activeFilterCount: number;
}

function FilterPanel({
  filteredCollections,
  currentCollectionHandle,
  onCloseDrawer,
  types,
  selectedType,
  setSelectedType,
  allSizes,
  selectedSizes,
  toggleSize,
  allColors,
  selectedColors,
  toggleColor,
  priceMin,
  priceMax,
  globalPriceMin,
  globalPriceMax,
  setPriceMin,
  setPriceMax,
  onlyAvailable,
  setOnlyAvailable,
  resetFilters,
  activeFilterCount,
}: FilterPanelProps) {
  return (
    <div className="space-y-8">

      {/* ── Collections ─────────────────────────────────────────── */}
      {filteredCollections.length > 0 && (
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Collections
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/collections/all"
              onClick={onCloseDrawer}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                !currentCollectionHandle
                  ? 'bg-foreground text-background shadow-md scale-105'
                  : 'bg-muted/60 text-foreground hover:bg-muted'
              }`}
            >
              Tous
            </Link>
            {filteredCollections.map((collection) => (
              <Link
                key={collection.handle}
                href={`/collections/${collection.handle}`}
                onClick={onCloseDrawer}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentCollectionHandle === collection.handle
                    ? 'bg-foreground text-background shadow-md scale-105'
                    : 'bg-muted/60 text-foreground hover:bg-muted'
                }`}
              >
                {collection.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Disponibilité ───────────────────────────────────────── */}
      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Disponibilité
        </h3>
        <label className="flex items-center gap-3 cursor-pointer select-none group">
          <div
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${
              onlyAvailable ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                onlyAvailable ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest group-hover:text-primary transition-colors">
            En stock uniquement
          </span>
        </label>
      </section>

      {/* ── Types ───────────────────────────────────────────────── */}
      {types.length > 1 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Type de produit
            </h3>
            {selectedType !== 'Tous' && (
              <button
                onClick={() => setSelectedType('Tous')}
                className="text-[9px] font-black uppercase tracking-widest text-primary"
              >
                Effacer
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedType === type
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-muted/60 text-foreground hover:bg-muted'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Couleurs ────────────────────────────────────────────── */}
      {allColors.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Couleur
            </h3>
            {selectedColors.length > 0 && (
              <button
                onClick={() => selectedColors.forEach(() => {})}
                className="text-[9px] font-black uppercase tracking-widest text-primary"
                // We call toggleColor for each selected color to clear them
                onClickCapture={(e) => {
                  e.stopPropagation();
                  selectedColors.slice().forEach(toggleColor);
                }}
              >
                Effacer
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {allColors.map((color) => {
              const hex = getColorHex(color);
              const active = selectedColors.includes(color);
              return (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  title={color}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    active
                      ? 'border-primary bg-primary/10 text-primary scale-105 shadow-sm'
                      : 'border-border/60 bg-muted/40 text-foreground hover:border-primary/40'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0"
                    style={{ backgroundColor: hex }}
                  />
                  {color}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Pointures ───────────────────────────────────────────── */}
      {allSizes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Pointure / Taille
            </h3>
            {selectedSizes.length > 0 && (
              <button
                onClickCapture={(e) => {
                  e.stopPropagation();
                  selectedSizes.slice().forEach(toggleSize);
                }}
                className="text-[9px] font-black uppercase tracking-widest text-primary"
              >
                Effacer
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((size) => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`min-w-[2.5rem] px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide border transition-all ${
                    active
                      ? 'bg-foreground text-background border-foreground shadow-md scale-105'
                      : 'bg-muted/60 text-foreground border-border/40 hover:border-foreground/40'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Prix ────────────────────────────────────────────────── */}
      {globalPriceMax > globalPriceMin && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Prix
            </h3>
            <span className="text-[10px] font-bold text-foreground">
              {priceMin} – {priceMax} MAD
            </span>
          </div>

          {/* Min slider */}
          <div className="space-y-3">
            <div className="relative h-1.5 bg-muted rounded-full">
              {/* filled track */}
              <div
                className="absolute h-full bg-primary rounded-full"
                style={{
                  left: `${((priceMin - globalPriceMin) / (globalPriceMax - globalPriceMin)) * 100}%`,
                  right: `${100 - ((priceMax - globalPriceMin) / (globalPriceMax - globalPriceMin)) * 100}%`,
                }}
              />
              {/* min thumb */}
              <input
                type="range"
                min={globalPriceMin}
                max={globalPriceMax}
                step={10}
                value={priceMin}
                onChange={(e) => {
                  const v = Math.min(Number(e.target.value), priceMax - 10);
                  setPriceMin(v);
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                style={{ zIndex: 3 }}
              />
              {/* max thumb */}
              <input
                type="range"
                min={globalPriceMin}
                max={globalPriceMax}
                step={10}
                value={priceMax}
                onChange={(e) => {
                  const v = Math.max(Number(e.target.value), priceMin + 10);
                  setPriceMax(v);
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                style={{ zIndex: 4 }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              <span>{globalPriceMin} MAD</span>
              <span>{globalPriceMax} MAD</span>
            </div>
          </div>
        </section>
      )}

      {/* ── Reset all ───────────────────────────────────────────── */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-primary text-primary text-[10px] font-black uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all"
        >
          <X size={11} /> Réinitialiser tous les filtres ({activeFilterCount})
        </button>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ProductListing({
  initialProducts,
  collections = [],
  currentCollectionHandle,
}: ProductListingProps) {
  const filteredCollections = collections.filter(
    (c) =>
      !EXCLUDED_COLLECTIONS.some(
        (excluded) =>
          c.title.toLowerCase().includes(excluded) ||
          c.handle.toLowerCase().includes(excluded.replace(' ', '-'))
      )
  );

  // ── filter state ────────────────────────────────────────────────────────
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ── derived data from products ──────────────────────────────────────────
  const { types, allSizes, allColors, globalPriceMin, globalPriceMax } =
    useMemo(() => {
      const productTypes = initialProducts
        .map((p) => p.node.productType)
        .filter((pt): pt is string => pt && pt.trim() !== '');
      const uniqueTypes = ['Tous', ...[...new Set(productTypes)].sort()];

      const sizesSet = new Set<string>();
      const colorsSet = new Set<string>();
      let minPrice = Infinity;
      let maxPrice = 0;

      initialProducts.forEach((edge) => {
        const product = edge.node;
        const sizeOpt = getOption(product.options, SIZE_NAMES);
        const colorOpt = getOption(product.options, COLOR_NAMES);
        sizeOpt?.values.forEach((v: string) => sizesSet.add(v));
        colorOpt?.values.forEach((v: string) => colorsSet.add(v));

        const price = parseFloat(product.priceRange.minVariantPrice.amount);
        if (price < minPrice) minPrice = price;
        if (price > maxPrice) maxPrice = price;
      });

      return {
        types: uniqueTypes,
        allSizes: [...sizesSet],
        allColors: [...colorsSet],
        globalPriceMin: minPrice === Infinity ? 0 : Math.floor(minPrice),
        globalPriceMax: maxPrice === 0 ? 10000 : Math.ceil(maxPrice),
      };
    }, [initialProducts]);

  const [priceMin, setPriceMin] = useState<number>(() =>
    initialProducts.length
      ? Math.floor(
          Math.min(
            ...initialProducts.map((p) =>
              parseFloat(p.node.priceRange.minVariantPrice.amount)
            )
          )
        )
      : 0
  );
  const [priceMax, setPriceMax] = useState<number>(() =>
    initialProducts.length
      ? Math.ceil(
          Math.max(
            ...initialProducts.map((p) =>
              parseFloat(p.node.priceRange.minVariantPrice.amount)
            )
          )
        )
      : 10000
  );

  // ── active filter count ─────────────────────────────────────────────────
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedType !== 'Tous') count++;
    count += selectedSizes.length;
    count += selectedColors.length;
    if (onlyAvailable) count++;
    if (priceMin > globalPriceMin || priceMax < globalPriceMax) count++;
    return count;
  }, [
    selectedType,
    selectedSizes,
    selectedColors,
    onlyAvailable,
    priceMin,
    priceMax,
    globalPriceMin,
    globalPriceMax,
  ]);

  // ── helpers ─────────────────────────────────────────────────────────────
  const toggleSize = (v: string) =>
    setSelectedSizes((prev) =>
      prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]
    );

  const toggleColor = (v: string) =>
    setSelectedColors((prev) =>
      prev.includes(v) ? prev.filter((c) => c !== v) : [...prev, v]
    );

  const resetFilters = () => {
    setSelectedType('Tous');
    setSelectedSizes([]);
    setSelectedColors([]);
    setOnlyAvailable(false);
    setPriceMin(globalPriceMin);
    setPriceMax(globalPriceMax);
  };

  // ── filtered + sorted products ──────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // type
    if (selectedType !== 'Tous') {
      result = result.filter(
        (p) => (p.node.productType || '') === selectedType
      );
    }

    // availability
    if (onlyAvailable) {
      result = result.filter((p) => isProductAvailable(p.node));
    }

    // price
    result = result.filter((p) => {
      const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
      return price >= priceMin && price <= priceMax;
    });

    // sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        const sizeOpt = getOption(p.node.options, SIZE_NAMES);
        const productSizes: string[] = sizeOpt?.values || [];
        return selectedSizes.some((s) => productSizes.includes(s));
      });
    }

    // colors
    if (selectedColors.length > 0) {
      result = result.filter((p) => {
        const colorOpt = getOption(p.node.options, COLOR_NAMES);
        const productColors: string[] = colorOpt?.values || [];
        return selectedColors.some((c) => productColors.includes(c));
      });
    }

    // sort
    if (sortBy === 'price-asc') {
      result.sort(
        (a, b) =>
          parseFloat(a.node.priceRange.minVariantPrice.amount) -
          parseFloat(b.node.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === 'price-desc') {
      result.sort(
        (a, b) =>
          parseFloat(b.node.priceRange.minVariantPrice.amount) -
          parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    }

    return result;
  }, [
    initialProducts,
    selectedType,
    onlyAvailable,
    priceMin,
    priceMax,
    selectedSizes,
    selectedColors,
    sortBy,
  ]);

  // ── shared panel props ──────────────────────────────────────────────────
  const filterPanelProps: FilterPanelProps = {
    filteredCollections,
    currentCollectionHandle,
    types,
    selectedType,
    setSelectedType,
    allSizes,
    selectedSizes,
    toggleSize,
    allColors,
    selectedColors,
    toggleColor,
    priceMin,
    priceMax,
    globalPriceMin,
    globalPriceMax,
    setPriceMin,
    setPriceMax,
    onlyAvailable,
    setOnlyAvailable,
    resetFilters,
    activeFilterCount,
  };

  return (
    <div className="flex flex-col gap-8">

      {/* ── Desktop: sort bar (top) ──────────────────────────────────────── */}
      <div className="hidden md:flex items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-border/50 sticky top-24 z-30 shadow-sm">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <Filter size={13} />
          <span>
            {filteredProducts.length} produit
            {filteredProducts.length !== 1 ? 's' : ''}
          </span>
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-primary text-white rounded-full px-2 py-0.5 text-[9px]">
              {activeFilterCount} filtre{activeFilterCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Trier par:
          </span>
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

      {/* ── Desktop: sidebar + grid layout ──────────────────────────────── */}
      <div className="hidden md:flex gap-8 items-start">

        {/* Sidebar filters */}
        <aside className="w-64 flex-shrink-0 sticky top-40 bg-white border border-border/50 rounded-3xl p-6 shadow-sm max-h-[calc(100vh-11rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black uppercase tracking-[0.15em]">
              Filtres
            </h2>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-1"
              >
                <X size={10} /> Reset ({activeFilterCount})
              </button>
            )}
          </div>
          <FilterPanel {...filterPanelProps} />
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedType !== 'Tous' && (
                <ActiveChip label={`Type: ${selectedType}`} onRemove={() => setSelectedType('Tous')} />
              )}
              {onlyAvailable && (
                <ActiveChip label="En stock" onRemove={() => setOnlyAvailable(false)} />
              )}
              {(priceMin > globalPriceMin || priceMax < globalPriceMax) && (
                <ActiveChip
                  label={`Prix: ${priceMin}–${priceMax} MAD`}
                  onRemove={() => { setPriceMin(globalPriceMin); setPriceMax(globalPriceMax); }}
                />
              )}
              {selectedColors.map((c) => (
                <ActiveChip key={c} label={`Couleur: ${c}`} onRemove={() => toggleColor(c)} />
              ))}
              {selectedSizes.map((s) => (
                <ActiveChip key={s} label={`Pointure: ${s}`} onRemove={() => toggleSize(s)} />
              ))}
            </div>
          )}

          <ProductGrid products={filteredProducts} resetFilters={resetFilters} />
        </div>
      </div>

      {/* ── Mobile: filter drawer + sort bar ────────────────────────────── */}
      <div className="md:hidden flex gap-3 sticky top-[80px] z-30 bg-[#FBFBFB]/90 backdrop-blur-md py-4">
        <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DrawerTrigger asChild>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-border/50 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 transition-transform">
              <SlidersHorizontal size={14} />
              Filtres
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white rounded-full px-1.5 py-0.5 text-[9px] ml-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </DrawerTrigger>
          <DrawerContent className="rounded-t-[2.5rem] px-6 pb-10 max-h-[90vh] overflow-y-auto">
            <DrawerHeader className="px-0 mb-6">
              <DrawerTitle className="text-2xl font-black uppercase tracking-tight text-left">
                Filtres
              </DrawerTitle>
            </DrawerHeader>
            <FilterPanel {...filterPanelProps} onCloseDrawer={() => setIsFilterOpen(false)} />
            <DrawerFooter className="px-0 mt-10">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-foreground text-background py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all"
              >
                Voir {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
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

      {/* Mobile active chips */}
      <div className="md:hidden">
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedType !== 'Tous' && (
              <ActiveChip label={`Type: ${selectedType}`} onRemove={() => setSelectedType('Tous')} />
            )}
            {onlyAvailable && (
              <ActiveChip label="En stock" onRemove={() => setOnlyAvailable(false)} />
            )}
            {(priceMin > globalPriceMin || priceMax < globalPriceMax) && (
              <ActiveChip
                label={`Prix: ${priceMin}–${priceMax} MAD`}
                onRemove={() => { setPriceMin(globalPriceMin); setPriceMax(globalPriceMax); }}
              />
            )}
            {selectedColors.map((c) => (
              <ActiveChip key={c} label={`Couleur: ${c}`} onRemove={() => toggleColor(c)} />
            ))}
            {selectedSizes.map((s) => (
              <ActiveChip key={s} label={`Pointure: ${s}`} onRemove={() => toggleSize(s)} />
            ))}
          </div>
        )}
        <ProductGrid products={filteredProducts} resetFilters={resetFilters} />
      </div>
    </div>
  );
}

// ─── ActiveChip ──────────────────────────────────────────────────────────────

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-colors"
    >
      {label} <X size={10} />
    </button>
  );
}

// ─── ProductGrid ─────────────────────────────────────────────────────────────

function ProductGrid({
  products,
  resetFilters,
}: {
  products: any[];
  resetFilters: () => void;
}) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex p-6 bg-muted rounded-full mb-6">
          <Filter size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight mb-2">
          Aucun résultat
        </h3>
        <p className="text-muted-foreground font-medium">
          Essayez de modifier vos filtres pour trouver ce que vous cherchez.
        </p>
        <button
          onClick={resetFilters}
          className="mt-8 text-primary font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-primary pb-1"
        >
          Réinitialiser les filtres
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 gap-y-8 md:gap-y-12">
      {products.map((edge: any) => {
        const product = edge.node;
        const price = formatPrice(product.priceRange.minVariantPrice.amount);
        const sizes = getOption(product.options, SIZE_NAMES)?.values || [];
        const productColors =
          getOption(product.options, COLOR_NAMES)?.values || [];
        const available = isProductAvailable(product);

        return (
          <div key={product.id} className="group flex flex-col">
            <a
              href={`/products/${product.handle}`}
              className="relative aspect-[4/5] mb-4 md:mb-5 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white border border-border/50 block group-hover:shadow-lg transition-all duration-500"
            >
              {product.images.edges[0] && (
                <div className="absolute inset-0 p-3 md:p-4">
                  <Image
                    src={product.images.edges[0].node.url}
                    alt={
                      product.images.edges[0].node.altText || product.title
                    }
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Out of stock badge */}
              {!available && (
                <div className="absolute top-3 left-3 bg-black/70 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Épuisé
                </div>
              )}

              {/* Hover quick action */}
              <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {sizes.slice(0, 6).map((v: string) => (
                      <span
                        key={v}
                        className="text-[8px] font-bold px-1.5 py-0.5 bg-foreground/5 rounded text-foreground/70 uppercase"
                      >
                        {v}
                      </span>
                    ))}
                    {sizes.length > 6 && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 text-foreground/40">
                        +{sizes.length - 6}
                      </span>
                    )}
                  </div>
                  <div className="h-px bg-border/50 w-full" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-foreground text-center">
                    Voir les détails
                  </span>
                </div>
              </div>
            </a>

            <div className="px-1">
              <div className="flex items-center justify-between mb-1.5 md:mb-2">
                <div className="flex items-center gap-0.5 md:gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={8}
                      className="fill-primary text-primary md:w-[10px] md:h-[10px]"
                    />
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
                  {productColors.length > 4 && (
                    <span className="text-[8px] font-bold text-muted-foreground">
                      +{productColors.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <a href={`/products/${product.handle}`} className="block">
                <h3 className="text-[11px] md:text-[13px] font-black uppercase tracking-tight truncate mb-0.5 md:mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </a>

              {/* Mobile size info */}
              <div className="flex flex-wrap gap-1 md:hidden mb-1">
                {sizes.slice(0, 4).map((v: string) => (
                  <span
                    key={v}
                    className="text-[7px] font-bold text-muted-foreground"
                  >
                    {v}
                  </span>
                ))}
                {sizes.length > 4 && (
                  <span className="text-[7px] font-bold text-muted-foreground">
                    +{sizes.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <p
                  className="text-primary font-black text-sm md:text-lg"
                  suppressHydrationWarning
                >
                  {price}
                </p>
                {!available && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground line-through md:hidden">
                    Épuisé
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}