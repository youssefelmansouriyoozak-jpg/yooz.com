import { getCollectionProducts, getCollections } from "@/lib/shopify";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProductListing from "@/components/sections/product-listing";
import Link from "next/link";
import { ShareBanner, ShareButton } from "@/components/ui/share-button";
import { Metadata } from "next";
import CollectionTracker from "@/components/collection-tracker";

const defaultOgImage = "https://yoozak.com/og-image.png";
const defaultDescription = "Découvrez notre collection de chaussures au Maroc. Livraison gratuite partout au Maroc.";

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionProducts(handle);
  
  if (!collection) {
    return {
      title: "Collection - Chaussures Maroc",
      description: defaultDescription,
      openGraph: { images: [{ url: defaultOgImage, width: 1200, height: 630 }] },
      twitter: { card: "summary_large_image", images: [defaultOgImage] },
    };
  }

  const imageUrl = collection.image?.url || defaultOgImage;
  const productCount = collection.products?.edges?.length || 0;
  const description = `Achetez ${collection.title} chez YOOZAK. ${productCount} produits disponibles. Livraison gratuite partout au Maroc. Paiement à la livraison.`;
  
  return {
    title: `${collection.title} - Acheter Chaussures au Maroc`,
    description,
    keywords: [
      collection.title.toLowerCase(),
      "chaussures maroc",
      "collection chaussures",
      "acheter en ligne maroc",
      "livraison gratuite",
    ],
    alternates: {
      canonical: `https://yoozak.com/collections/${handle}`,
    },
    openGraph: {
      title: `Collection ${collection.title} | YOOZAK Maroc`,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: collection.title }],
      type: "website",
      siteName: "YOOZAK",
      url: `https://yoozak.com/collections/${handle}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Collection ${collection.title} | YOOZAK`,
      description,
      images: [imageUrl],
    },
  };
}

// Generate JSON-LD for collection
function generateCollectionJsonLd(collection: any, handle: string) {
  const products = collection.products?.edges || [];
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: `Collection ${collection.title} - Chaussures de qualité au Maroc`,
    url: `https://yoozak.com/collections/${handle}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((edge: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: edge.node.title,
          url: `https://yoozak.com/products/${edge.node.handle}`,
          image: edge.node.images?.edges?.[0]?.node?.url,
          offers: {
            "@type": "Offer",
            priceCurrency: "MAD",
            price: edge.node.priceRange?.minVariantPrice?.amount || "0",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };
}

// Generate BreadcrumbList JSON-LD
function generateBreadcrumbJsonLd(collection: any, handle: string) {
  return {
    "@context": "https://schema.org",
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
        name: "Collections",
        item: "https://yoozak.com/collections/all",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: collection.title,
        item: `https://yoozak.com/collections/${handle}`,
      },
    ],
  };
}

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  const { handle } = await params;
  const [collection, collectionsData] = await Promise.all([
    getCollectionProducts(handle),
    getCollections()
  ]);

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges;
  const collections = collectionsData.map((c: any) => ({
    title: c.node.title,
    handle: c.node.handle
  }));

  const collectionJsonLd = generateCollectionJsonLd(collection, handle);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(collection, handle);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <div className="bg-[#FBFBFB] min-h-screen pb-20">
        <CollectionTracker collectionTitle={collection.title} />
        {/* Header */}
        <div className="bg-white border-b border-border/50 pt-10 pb-16">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <ChevronRight size={10} className="opacity-40" aria-hidden="true" />
              <Link href="/collections/all" className="hover:text-primary transition-colors">Collections</Link>
              <ChevronRight size={10} className="opacity-40" aria-hidden="true" />
              <span className="text-foreground font-black">{collection.title}</span>
            </nav>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Collection</span>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                  {collection.title}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground max-w-sm font-medium text-sm md:text-base border-l-2 border-primary/20 pl-6 py-2">
                  Découvrez notre sélection exclusive de {collection.title.toLowerCase()} conçue pour votre style et confort.
                </p>
                <ShareButton variant="icon" title={`Collection ${collection.title} - Yoozak`} />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12">
          <ShareBanner title={`Collection ${collection.title} - Yoozak`} className="mb-8" />
          <ProductListing initialProducts={products} collections={collections} currentCollectionHandle={handle} />
        </div>
      </div>
    </>
  );
}
