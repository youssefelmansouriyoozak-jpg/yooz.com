'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Filter,
  X,
  SlidersHorizontal,
} from 'lucide-react';

import { formatPrice, getColorHex } from '@/lib/utils';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
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

const EXCLUDED_COLLECTIONS = [
  'bonnes affaires',
  'nos arrivages',
  'best sellers',
  'best-sellers',
];

/* ============================================================
   HELPERS
============================================================ */

function getOption(options: any[], names: string[]) {
  if (!Array.isArray(options)) return undefined;

  return options.find((option: any) => {
    if (!option?.name) return false;

    const optionName = option.name.toLowerCase();

    return names.some(
      (name) =>
        optionName.includes(name.toLowerCase()) ||
        name.toLowerCase().includes(optionName)
    );
  });
}

function isProductAvailable(product: any): boolean {
  if (!product) return false;

  if (product.availableForSale === false) {
    return false;
  }

  if (Array.isArray(product.variants?.edges)) {
    return product.variants.edges.some(
      (variant: any) => variant?.node?.availableForSale === true
    );
  }

  return product.availableForSale !== false;
}

function getProductImage(product: any) {
  return product?.images?.edges?.[0]?.node;
}

/* ============================================================
   FILTER PANEL
============================================================ */

interface FilterPanelProps {
  filteredCollections: Collection[];
  currentCollectionHandle?: string;
  onCloseDrawer?: () => void;

  types: string[];
  selectedType: string;
  setSelectedType: (value: string) => void;

  allSizes: string[];
  selectedSizes: string[];
  toggleSize: (value: string) => void;

  allColors: string[];
  selectedColors: string[];
  toggleColor: (value: string) => void;
  clearColors: () => void;

  priceMin: number;
  priceMax: number;
  globalPriceMin: number;
  globalPriceMax: number;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;

  onlyAvailable: boolean;
  setOnlyAvailable: (value: boolean) => void;

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
  clearColors,

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

      {/* =====================================================
          COLLECTIONS
      ===================================================== */}

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

      {/* =====================================================
          DISPONIBILITE
      ===================================================== */}

      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Disponibilité
        </h3>

        <button
          type="button"
          onClick={() => setOnlyAvailable(!onlyAvailable)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div
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
        </button>
      </section>

      {/* =====================================================
          TYPE
      ===================================================== */}

      {types.length > 1 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Type de produit
            </h3>

            {selectedType !== 'Tous' && (
              <button
                type="button"
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
                type="button"
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

      {/* =====================================================
          COULEURS
      ===================================================== */}

      {allColors.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Couleur
            </h3>

            {selectedColors.length > 0 && (
              <button
                type="button"
                onClick={clearColors}
                className="text-[9px] font-black uppercase tracking-widest text-primary"
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
                  type="button"
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
                    style={{
                      backgroundColor: hex,
                    }}
                  />

                  {color}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================
          TAILLES
      ===================================================== */}

      {allSizes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Pointure / Taille
            </h3>

            {selectedSizes.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  selectedSizes.forEach(toggleSize);
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
                  type="button"
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

      {/* =====================================================
          PRIX
      ===================================================== */}

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

          <div className="space-y-3">
            <div className="relative h-1.5 bg-muted rounded-full">

              <div
                className="absolute h-full bg-primary rounded-full"
                style={{
                  left: `${
                    ((priceMin - globalPriceMin) /
                      (globalPriceMax - globalPriceMin)) *
                    100
                  }%`,
                  right: `${
                    100 -
                    ((priceMax - globalPriceMin) /
                      (globalPriceMax - globalPriceMin)) *
                      100
                  }%`,
                }}
              />

              <input
                type="range"
                min={globalPriceMin}
                max={globalPriceMax}
                step={10}
                value={priceMin}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  setPriceMin(
                    Math.min(value, Math.max(globalPriceMin, priceMax - 10))
                  );
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                style={{ zIndex: 3 }}
              />

              <input
                type="range"
                min={globalPriceMin}
                max={globalPriceMax}
                step={10}
                value={priceMax}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  setPriceMax(
                    Math.max(value, Math.min(globalPriceMax, priceMin + 10))
                  );
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

      {/* =====================================================
          RESET
      ===================================================== */}

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-primary text-primary text-[10px] font-black uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all"
        >
          <X size={11} />

          Réinitialiser tous les filtres ({activeFilterCount})
        </button>
      )}
    </div>
  );
}

/* ============================================================
   MAIN PRODUCT LISTING
============================================================ */

export default function ProductListing({
  initialProducts,
  collections = [],
  currentCollectionHandle,
}: ProductListingProps) {

  const safeProducts = Array.isArray(initialProducts)
    ? initialProducts
    : [];

  const filteredCollections = collections.filter(
    (collection) =>
      !EXCLUDED_COLLECTIONS.some(
        (excluded) =>
          collection.title.toLowerCase().includes(excluded) ||
          collection.handle
            .toLowerCase()
            .includes(excluded.replace(' ', '-'))
      )
  );

  /* ============================================================
     FILTER STATE
  ============================================================ */

  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ============================================================
     DERIVED DATA
  ============================================================ */

  const {
    types,
    allSizes,
    allColors,
    globalPriceMin,
    globalPriceMax,
  } = useMemo(() => {

    const productTypes = safeProducts
      .map((item) => item?.node?.productType)
      .filter(
        (type): type is string =>
          typeof type === 'string' && type.trim() !== ''
      );

    const uniqueTypes = [
      'Tous',
      ...Array.from(new Set(productTypes)).sort(),
    ];

    const sizesSet = new Set<string>();
    const colorsSet = new Set<string>();

    let minPrice = Infinity;
    let maxPrice = 0;

    safeProducts.forEach((edge) => {
      const product = edge?.node;

      if (!product) return;

      const sizeOption = getOption(product.options, SIZE_NAMES);
      const colorOption = getOption(product.options, COLOR_NAMES);

      sizeOption?.values?.forEach((value: string) => {
        sizesSet.add(value);
      });

      colorOption?.values?.forEach((value: string) => {
        colorsSet.add(value);
      });

      const amount = parseFloat(
        product?.priceRange?.minVariantPrice?.amount || '0'
      );

      if (amount < minPrice) {
        minPrice = amount;
      }

      if (amount > maxPrice) {
        maxPrice = amount;
      }
    });

    return {
      types: uniqueTypes,
      allSizes: Array.from(sizesSet),
      allColors: Array.from(colorsSet),
      globalPriceMin:
        minPrice === Infinity ? 0 : Math.floor(minPrice),
      globalPriceMax:
        maxPrice === 0 ? 10000 : Math.ceil(maxPrice),
    };

  }, [safeProducts]);

  /* ============================================================
     PRICE STATE
  ============================================================ */

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);

  /* Sync prices when products change */
  useMemo(() => {
    setPriceMin(globalPriceMin);
    setPriceMax(globalPriceMax);
  }, [globalPriceMin, globalPriceMax]);

  /* ============================================================
     FILTER FUNCTIONS
  ============================================================ */

  const toggleSize = (value: string) => {
    setSelectedSizes((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  };

  const toggleColor = (value: string) => {
    setSelectedColors((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  };

  const clearColors = () => {
    setSelectedColors([]);
  };

  const resetFilters = () => {
    setSelectedType('Tous');
    setSelectedSizes([]);
    setSelectedColors([]);
    setOnlyAvailable(false);
    setPriceMin(globalPriceMin);
    setPriceMax(globalPriceMax);
  };

  /* ============================================================
     ACTIVE FILTER COUNT
  ============================================================ */

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (selectedType !== 'Tous') {
      count++;
    }

    count += selectedSizes.length;
    count += selectedColors.length;

    if (onlyAvailable) {
      count++;
    }

    if (
      priceMin > globalPriceMin ||
      priceMax < globalPriceMax
    ) {
      count++;
    }

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

  /* ============================================================
     FILTER PRODUCTS
  ============================================================ */

  const filteredProducts = useMemo(() => {

    let result = [...safeProducts];

    /* TYPE */
    if (selectedType !== 'Tous') {
      result = result.filter(
        (item) =>
          item?.node?.productType === selectedType
      );
    }

    /* STOCK */
    if (onlyAvailable) {
      result = result.filter((item) =>
        isProductAvailable(item?.node)
      );
    }

    /* PRICE */
    result = result.filter((item) => {

      const price = parseFloat(
        item?.node?.priceRange?.minVariantPrice?.amount || '0'
      );

      return price >= priceMin && price <= priceMax;
    });

    /* SIZE */
    if (selectedSizes.length > 0) {
      result = result.filter((item) => {

        const sizeOption = getOption(
          item?.node?.options,
          SIZE_NAMES
        );

        const productSizes =
          sizeOption?.values || [];

        return selectedSizes.some((size) =>
          productSizes.includes(size)
        );
      });
    }

    /* COLOR */
    if (selectedColors.length > 0) {
      result = result.filter((item) => {

        const colorOption = getOption(
          item?.node?.options,
          COLOR_NAMES
        );

        const productColors =
          colorOption?.values || [];

        return selectedColors.some((color) =>
          productColors.includes(color)
        );
      });
    }

    /* SORT */
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {

        const priceA = parseFloat(
          a?.node?.priceRange?.minVariantPrice?.amount || '0'
        );

        const priceB = parseFloat(
          b?.node?.priceRange?.minVariantPrice?.amount || '0'
        );

        return priceA - priceB;
      });
    }

    if (sortBy === 'price-desc') {
      result.sort((a, b) => {

        const priceA = parseFloat(
          a?.node?.priceRange?.minVariantPrice?.amount || '0'
        );

        const priceB = parseFloat(
          b?.node?.priceRange?.minVariantPrice?.amount || '0'
        );

        return priceB - priceA;
      });
    }

    return result;

  }, [
    safeProducts,
    selectedType,
    onlyAvailable,
    priceMin,
    priceMax,
    selectedSizes,
    selectedColors,
    sortBy,
  ]);

  /* ============================================================
     FILTER PANEL PROPS
  ============================================================ */

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
    clearColors,

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

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="flex flex-col gap-8">

      {/* ========================================================
          DESKTOP SORT BAR
      ======================================================== */}

      <div className="hidden md:flex items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-border/50 sticky top-24 z-30 shadow-sm">

        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">

          <Filter size={13} />

          <span>
            {filteredProducts.length} produit
            {filteredProducts.length !== 1 ? 's' : ''}
          </span>

          {activeFilterCount > 0 && (
            <span className="ml-1 bg-primary text-white rounded-full px-2 py-0.5 text-[9px]">
              {activeFilterCount} filtre
              {activeFilterCount > 1 ? 's' : ''}
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
            <option value="price-asc">
              Prix: Croissant
            </option>
            <option value="price-desc">
              Prix: Décroissant
            </option>
          </select>
        </div>
      </div>

      {/* ========================================================
          DESKTOP
      ======================================================== */}

      <div className="hidden md:flex gap-8 items-start">

        {/* SIDEBAR */}

        <aside className="w-64 flex-shrink-0 sticky top-40 bg-white border border-border/50 rounded-3xl p-6 shadow-sm max-h-[calc(100vh-11rem)] overflow-y-auto">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-sm font-black uppercase tracking-[0.15em]">
              Filtres
            </h2>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-1"
              >
                <X size={10} />
                Reset ({activeFilterCount})
              </button>
            )}

          </div>

          <FilterPanel {...filterPanelProps} />

        </aside>

        {/* PRODUCTS */}

        <div className="flex-1">

          <ActiveFilters
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
            priceMin={priceMin}
            priceMax={priceMax}
            globalPriceMin={globalPriceMin}
            globalPriceMax={globalPriceMax}
            selectedColors={selectedColors}
            toggleColor={toggleColor}
            selectedSizes={selectedSizes}
            toggleSize={toggleSize}
            activeFilterCount={activeFilterCount}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
          />

          <ProductGrid
            products={filteredProducts}
            resetFilters={resetFilters}
          />

        </div>
      </div>

      {/* ========================================================
          MOBILE FILTER BAR
      ======================================================== */}

      <div className="md:hidden flex gap-3 sticky top-[80px] z-30 bg-[#FBFBFB]/90 backdrop-blur-md py-4">

        <Drawer
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
        >

          <DrawerTrigger asChild>

            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-border/50 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 transition-transform"
            >
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

            <FilterPanel
              {...filterPanelProps}
              onCloseDrawer={() =>
                setIsFilterOpen(false)
              }
            />

            <DrawerFooter className="px-0 mt-10">

              <button
                type="button"
                onClick={() =>
                  setIsFilterOpen(false)
                }
                className="w-full bg-foreground text-background py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all"
              >
                Voir {filteredProducts.length} produit
                {filteredProducts.length !== 1 ? 's' : ''}
              </button>

            </DrawerFooter>

          </DrawerContent>

        </Drawer>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="flex-1 bg-white border border-border/50 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center outline-none shadow-sm appearance-none"
        >
          <option value="featured">
            Trier par
          </option>

          <option value="price-asc">
            Prix ↑
          </option>

          <option value="price-desc">
            Prix ↓
          </option>
        </select>

      </div>

      {/* ========================================================
          MOBILE PRODUCTS
      ======================================================== */}

      <div className="md:hidden">

        <ActiveFilters
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          priceMin={priceMin}
          priceMax={priceMax}
          globalPriceMin={globalPriceMin}
          globalPriceMax={globalPriceMax}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          activeFilterCount={activeFilterCount}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
        />

        <ProductGrid
          products={filteredProducts}
          resetFilters={resetFilters}
        />

      </div>

    </div>
  );
}

/* ============================================================
   ACTIVE FILTERS
============================================================ */

function ActiveFilters({
  selectedType,
  setSelectedType,
  onlyAvailable,
  setOnlyAvailable,
  priceMin,
  priceMax,
  globalPriceMin,
  globalPriceMax,
  selectedColors,
  toggleColor,
  selectedSizes,
  toggleSize,
  activeFilterCount,
  setPriceMin,
  setPriceMax,
}: any) {

  if (activeFilterCount <= 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">

      {selectedType !== 'Tous' && (
        <ActiveChip
          label={`Type: ${selectedType}`}
          onRemove={() =>
            setSelectedType('Tous')
          }
        />
      )}

      {onlyAvailable && (
        <ActiveChip
          label="En stock"
          onRemove={() =>
            setOnlyAvailable(false)
          }
        />
      )}

      {(priceMin > globalPriceMin ||
        priceMax < globalPriceMax) && (
        <ActiveChip
          label={`Prix: ${priceMin}–${priceMax} MAD`}
          onRemove={() => {
            setPriceMin(globalPriceMin);
            setPriceMax(globalPriceMax);
          }}
        />
      )}

      {selectedColors.map((color: string) => (
        <ActiveChip
          key={`color-${color}`}
          label={`Couleur: ${color}`}
          onRemove={() =>
            toggleColor(color)
          }
        />
      ))}

      {selectedSizes.map((size: string) => (
        <ActiveChip
          key={`size-${size}`}
          label={`Pointure: ${size}`}
          onRemove={() =>
            toggleSize(size)
          }
        />
      ))}

    </div>
  );
}

/* ============================================================
   ACTIVE CHIP
============================================================ */

function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-colors"
    >
      {label}

      <X size={10} />
    </button>
  );
}

/* ============================================================
   PRODUCT GRID
============================================================ */

function ProductGrid({
  products,
  resetFilters,
}: {
  products: any[];
  resetFilters: () => void;
}) {

  /* ==========================================================
     EMPTY
  ========================================================== */

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">

        <div className="inline-flex p-6 bg-muted rounded-full mb-6">
          <Filter
            size={32}
            className="text-muted-foreground"
          />
        </div>

        <h3 className="text-xl font-black uppercase tracking-tight mb-2">
          Aucun résultat
        </h3>

        <p className="text-muted-foreground font-medium">
          Essayez de modifier vos filtres pour trouver ce que vous cherchez.
        </p>

        <button
          type="button"
          onClick={resetFilters}
          className="mt-8 text-primary font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-primary pb-1"
        >
          Réinitialiser les filtres
        </button>

      </div>
    );
  }

  /* ==========================================================
     GRID
  ========================================================== */

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 gap-y-8 md:gap-y-12">

      {products.map((edge: any) => {

        const product = edge?.node;

        if (!product) {
          return null;
        }

        const image = getProductImage(product);

        const price = formatPrice(
          product?.priceRange?.minVariantPrice?.amount || '0'
        );

        const sizes =
          getOption(
            product.options,
            SIZE_NAMES
          )?.values || [];

        const productColors =
          getOption(
            product.options,
            COLOR_NAMES
          )?.values || [];

        const available =
          isProductAvailable(product);

        return (
          <div
            key={product.id}
            className="group flex flex-col"
          >

            {/* ==================================================
                IMAGE
            ================================================== */}

            <Link
              href={`/products/${product.handle}`}
              className="relative aspect-[4/5] mb-4 md:mb-5 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white border border-border/50 block group-hover:shadow-lg transition-all duration-500"
            >

              {image?.url ? (
                <div className="absolute inset-0 p-3 md:p-4">

                  <Image
                    src={image.url}
                    alt={
                      image.altText ||
                      product.title ||
                      'Produit'
                    }
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />

                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                    Image indisponible
                  </span>
                </div>
              )}

              {/* STOCK */}

              {!available && (
                <div className="absolute top-3 left-3 bg-black/70 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Épuisé
                </div>
              )}

              {/* DESKTOP QUICK INFO */}

              <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">

                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex flex-col gap-2">

                  <div className="flex flex-wrap gap-1 justify-center">

                    {sizes.slice(0, 6).map((value: string) => (
                      <span
                        key={value}
                        className="text-[8px] font-bold px-1.5 py-0.5 bg-foreground/5 rounded text-foreground/70 uppercase"
                      >
                        {value}
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

            </Link>

            {/* ==================================================
                PRODUCT INFO
            ================================================== */}

            <div className="px-1">

              <div className="flex items-center justify-between mb-1.5 md:mb-2">

                {/* STARS */}

                <div className="flex items-center gap-0.5 md:gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={8}
                      className="fill-primary text-primary md:w-[10px] md:h-[10px]"
                    />
                  ))}

                </div>

                {/* COLORS */}

                <div className="flex gap-1">

                  {productColors
                    .slice(0, 4)
                    .map((color: string) => (
                      <div
                        key={color}
                        className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-border shadow-sm"
                        style={{
                          backgroundColor:
                            getColorHex(color),
                        }}
                        title={color}
                      />
                    ))}

                  {productColors.length > 4 && (
                    <span className="text-[8px] font-bold text-muted-foreground">
                      +{productColors.length - 4}
                    </span>
                  )}

                </div>

              </div>

              {/* TITLE */}

              <Link
                href={`/products/${product.handle}`}
                className="block"
              >
                <h3 className="text-[11px] md:text-[13px] font-black uppercase tracking-tight truncate mb-0.5 md:mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </Link>

              {/* MOBILE SIZES */}

              <div className="flex flex-wrap gap-1 md:hidden mb-1">

                {sizes
                  .slice(0, 4)
                  .map((size: string) => (
                    <span
                      key={size}
                      className="text-[7px] font-bold text-muted-foreground"
                    >
                      {size}
                    </span>
                  ))}

                {sizes.length > 4 && (
                  <span className="text-[7px] font-bold text-muted-foreground">
                    +{sizes.length - 4}
                  </span>
                )}

              </div>

              {/* PRICE */}

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