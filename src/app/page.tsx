import HeroSection from "@/components/sections/hero";
import PromoCards from "@/components/sections/promo-cards";
import CategoryCircles from "@/components/sections/category-circles";
import BehindTheScene from "@/components/sections/behind-the-scene";
import FootwearGrid from "@/components/sections/footwear-grid";
import BlogPreview from "@/components/sections/blog-preview";
import { getCollectionProducts } from "@/lib/shopify";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { formatPrice, getColorHex } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YOOZAK | Boutique Chaussures en Ligne au Maroc - Livraison Gratuite",
  description: "Achetez vos chaussures en ligne au Maroc chez YOOZAK. Sneakers, bottines, escarpins, mocassins, sandales pour homme et femme. Livraison gratuite partout au Maroc. Paiement à la livraison. Nouvelle collection 2026.",
  keywords: [
    "chaussures maroc",
    "boutique chaussures en ligne",
    "sneakers maroc",
    "bottines femme",
    "escarpins maroc",
    "mocassins homme",
    "sandales femme maroc",
    "livraison gratuite",
    "paiement à la livraison",
    "yoozak",
  ],
  alternates: {
    canonical: "https://yoozak.com",
  },
  openGraph: {
    title: "YOOZAK | Boutique Chaussures en Ligne au Maroc",
    description: "Découvrez notre collection de chaussures tendance pour homme et femme. Livraison gratuite partout au Maroc.",
    url: "https://yoozak.com",
    type: "website",
  },
};

// JSON-LD Structured Data for Organization and Website
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "YOOZAK",
  url: "https://yoozak.com",
  logo: "https://yoozak.com/og-image.png",
  description: "Boutique en ligne de chaussures au Maroc. Sneakers, bottines, escarpins, mocassins pour homme et femme.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
    addressLocality: "Casablanca",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["French", "Arabic"],
  },
  sameAs: [
    "https://www.facebook.com/yoozak",
    "https://www.instagram.com/yoozak",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "YOOZAK",
  url: "https://yoozak.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://yoozak.com/collections/all?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ShoeStore",
  name: "YOOZAK",
  image: "https://yoozak.com/og-image.png",
  url: "https://yoozak.com",
  description: "Boutique en ligne de chaussures au Maroc avec livraison gratuite",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
  },
  priceRange: "$$",
  paymentAccepted: "Cash on Delivery",
  currenciesAccepted: "MAD",
  areaServed: {
    "@type": "Country",
    name: "Morocco",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Chaussures Homme et Femme",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Chaussures Femme",
        itemListElement: ["Bottines", "Escarpins", "Sandales", "Sneakers", "Sabots"],
      },
      {
        "@type": "OfferCatalog",
        name: "Chaussures Homme",
        itemListElement: ["Mocassins", "Sneakers", "Boots", "Derbies"],
      },
    ],
  },
};

export default async function Home() {

  const collection = await getCollectionProducts("nos-arrivages");
  const products = (collection?.products?.edges || []).slice(0, 10);
  
  const getOption = (options: any[], names: string[]) => {
    return options?.find((o: any) => names.some(name => o.name.toLowerCase().includes(name.toLowerCase()) || name.includes(o.name)));
  };

  const SIZE_NAMES = ['size', 'pointure', 'القياس', 'taille'];
  const COLOR_NAMES = ['color', 'couleur', 'الألوان', 'لون'];

  return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        
        <div className="flex flex-col min-h-screen bg-[#FBFBFB]">
        <HeroSection />
      
      <CategoryCircles />
      
      <PromoCards />

      <BehindTheScene />

      {/* Dynamic Shopify Section: New Arrivals */}
      <section className="py-6 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-16 text-center md:text-left">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-2 md:mb-4 block">Collection 2026</span>
              <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight mb-2 md:mb-4">Nouvel Arrivage</h2>
              <p className="text-muted-foreground max-w-md font-medium text-[12px] md:text-base">Découvrez nos derniers arrivages Yoozak.</p>
            </div>
            <a href="/collections/nos-arrivages" className="mt-6 md:mt-0 group flex items-center gap-3 md:gap-4 bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary transition-all duration-300">
              Voir tout <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {products.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 gap-y-8 md:gap-y-12 opacity-40 grayscale">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col">
                  <div className="relative aspect-[4/5] mb-4 md:mb-6 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-muted animate-pulse" />
                  <div className="h-3 md:h-4 bg-muted w-3/4 mb-2 animate-pulse" />
                  <div className="h-3 md:h-4 bg-muted w-1/4 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 gap-y-8 md:gap-y-12">
              {products.map((edge: any) => {
                const product = edge.node;
                const price = formatPrice(product.priceRange.minVariantPrice.amount);
                
                const sizes = getOption(product.options, SIZE_NAMES)?.values || [];
                const colors = getOption(product.options, COLOR_NAMES)?.values || [];

                return (
                  <div key={product.id} className="group flex flex-col">
                    <a 
                      href={`/products/${product.handle}`}
                      className="relative aspect-square mb-3 overflow-hidden rounded-2xl bg-[#f8f8f8] block"
                    >
                      {product.images.edges[0] && (
                        <Image
                          src={product.images.edges[0].node.url}
                          alt={product.images.edges[0].node.altText || product.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 20vw"
                          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="flex flex-col gap-3">
                          {colors.length > 0 && (
                            <div className="flex gap-2 justify-center">
                              {colors.slice(0, 4).map((v: string) => (
                                <div 
                                  key={v} 
                                  className="w-6 h-6 rounded-full border-2 border-white/80 shadow-lg transform hover:scale-110 transition-transform cursor-pointer" 
                                  style={{ backgroundColor: getColorHex(v) }}
                                  title={v} 
                                />
                              ))}
                              {colors.length > 4 && (
                                <div className="w-6 h-6 rounded-full border-2 border-white/80 shadow-lg bg-white/20 backdrop-blur flex items-center justify-center">
                                  <span className="text-[8px] font-semibold text-white">+{colors.length - 4}</span>
                                </div>
                              )}
                            </div>
                          )}
                          <span className="text-xs font-medium text-white text-center tracking-wide">Découvrir →</span>
                        </div>
                      </div>
                    </a>

                    <div className="space-y-1.5">
                      <a href={`/products/${product.handle}`} className="block">
                        <h3 className="text-sm md:text-base font-medium text-foreground/90 truncate group-hover:text-primary transition-colors tracking-wide">{product.title}</h3>
                      </a>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {sizes.length > 0 && `${sizes[0]} - ${sizes[sizes.length - 1]}`}
                        </span>
                        {sizes.length > 0 && <span className="text-muted-foreground/30">|</span>}
                        <span className="text-primary font-semibold text-sm md:text-base" suppressHydrationWarning>
                          {price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <FootwearGrid />
        <BlogPreview />
      </div>
      </>
  );
}
