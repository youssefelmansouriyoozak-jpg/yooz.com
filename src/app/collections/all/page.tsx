import { getAllProducts, getCollections } from "@/lib/shopify";
import ProductListing from "@/components/sections/product-listing";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tous les Produits - Chaussures Homme & Femme au Maroc",
  description: "Explorez notre catalogue complet de chaussures au Maroc. Sneakers, bottines, escarpins, mocassins, sandales. Livraison gratuite partout au Maroc. Paiement à la livraison.",
  keywords: [
    "chaussures maroc",
    "catalogue chaussures",
    "tous les produits",
    "sneakers maroc",
    "bottines femme",
    "mocassins homme",
    "livraison gratuite",
    "acheter chaussures en ligne",
  ],
  alternates: {
    canonical: "https://yoozak.com/collections/all",
  },
  openGraph: {
    title: "Tous les Produits | YOOZAK Maroc",
    description: "Explorez notre catalogue complet de chaussures. Livraison gratuite partout au Maroc.",
    url: "https://yoozak.com/collections/all",
    type: "website",
  },
};

// JSON-LD for all products page
const allProductsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tous les Produits - YOOZAK",
  description: "Catalogue complet de chaussures homme et femme au Maroc",
  url: "https://yoozak.com/collections/all",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://yoozak.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tous les Produits",
        item: "https://yoozak.com/collections/all",
      },
    ],
  },
};

export default async function AllProductsPage() {
  const [products, collectionsData] = await Promise.all([
    getAllProducts(),
    getCollections()
  ]);
  
  const collections = collectionsData.map((c: any) => ({
    title: c.node.title,
    handle: c.node.handle
  }));

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allProductsJsonLd) }}
      />
      
      <div className="bg-[#FBFBFB] min-h-screen pb-20">
        {/* Header */}
        <div className="bg-white border-b border-border/50 pt-10 pb-16">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <ChevronRight size={10} className="opacity-40" aria-hidden="true" />
              <Link href="/collections/all" className="hover:text-primary transition-colors">Collection</Link>
              <ChevronRight size={10} className="opacity-40" aria-hidden="true" />
              <span className="text-foreground font-black">Tous les produits</span>
            </nav>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Collection Complète</span>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                  Tous les <br className="hidden md:block" /> Produits
                </h1>
              </div>
                <p className="text-muted-foreground max-w-sm font-medium text-sm md:text-base border-l-2 border-primary/20 pl-6 py-2">
                  Explorez notre catalogue complet de chaussures homme et femme. Filtrez par catégorie pour trouver la paire parfaite.
                </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12">
          <ProductListing initialProducts={products} collections={collections} />
        </div>
      </div>
    </>
  );
}
