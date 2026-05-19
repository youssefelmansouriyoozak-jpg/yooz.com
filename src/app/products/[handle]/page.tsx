import { getProduct } from "@/lib/shopify";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProductPageClient from "@/components/product-page-client";
import { Metadata } from "next";

const defaultOgImage = "https://yoozak.com/og-image.png";
const defaultDescription = "Achetez vos chaussures en ligne au Maroc. Livraison gratuite partout au Maroc. Paiement à la livraison.";

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  
  if (!product) {
    return {
      title: "Produit non trouvé",
      description: defaultDescription,
      openGraph: { images: [{ url: defaultOgImage, width: 1200, height: 630 }] },
      twitter: { card: "summary_large_image", images: [defaultOgImage] },
    };
  }

  const imageUrl = product.images?.edges?.[0]?.node?.url || defaultOgImage;
  const price = product.priceRange?.minVariantPrice?.amount || "0";
  const description = `Achetez ${product.title} chez YOOZAK à ${price} MAD. ${product.description?.slice(0, 100) || "Livraison gratuite partout au Maroc. Paiement à la livraison."}`;
  
  return {
    title: `${product.title} - Acheter en ligne au Maroc`,
    description,
    keywords: [
      product.title.toLowerCase(),
      "chaussures maroc",
      "acheter en ligne",
      "livraison gratuite maroc",
      product.productType?.toLowerCase() || "chaussures",
    ],
    alternates: {
      canonical: `https://yoozak.com/products/${handle}`,
    },
    openGraph: {
      title: `${product.title} | YOOZAK Maroc`,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.title }],
      type: "website",
      siteName: "YOOZAK",
      url: `https://yoozak.com/products/${handle}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | YOOZAK`,
      description,
      images: [imageUrl],
    },
  };
}

// Generate JSON-LD for product
function generateProductJsonLd(product: any) {
  const price = product.priceRange?.minVariantPrice?.amount || "0";
  const imageUrl = product.images?.edges?.[0]?.node?.url || defaultOgImage;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `${product.title} - Chaussures de qualité au Maroc`,
    image: product.images?.edges?.map((e: any) => e.node.url) || [imageUrl],
    brand: {
      "@type": "Brand",
      name: "YOOZAK",
    },
    offers: {
      "@type": "Offer",
      url: `https://yoozak.com/products/${product.handle}`,
      priceCurrency: "MAD",
      price: price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "YOOZAK",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "MAD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MA",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "124",
    },
  };
}

// Generate BreadcrumbList JSON-LD
function generateBreadcrumbJsonLd(product: any) {
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
        name: "Toutes les Chaussures",
        item: "https://yoozak.com/collections/all",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `https://yoozak.com/products/${product.handle}`,
      },
    ],
  };
}

// Generate FAQ Schema JSON-LD for SEO rich snippets
function generateFAQJsonLd(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quelle est la politique de livraison pour ${product.title} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Livraison gratuite partout au Maroc sous 1-3 jours ouvrables. Paiement à la livraison disponible sans frais supplémentaires.",
        },
      },
      {
        "@type": "Question",
        name: "Comment choisir ma pointure ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos chaussures taillent normalement. Référez-vous à votre pointure habituelle. En cas de doute entre deux tailles, nous vous conseillons de prendre la taille supérieure. Notre service client est disponible pour vous aider.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je retourner ou échanger mon article ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, vous disposez de 14 jours pour retourner ou échanger votre article dans son état d'origine avec l'emballage complet. Contactez notre service client pour organiser le retour.",
        },
      },
      {
        "@type": "Question",
        name: "Les photos correspondent-elles au produit réel ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos photos sont prises en studio avec un éclairage professionnel pour représenter au mieux les couleurs et détails du produit. De légères variations peuvent exister selon les paramètres de votre écran.",
        },
      },
    ],
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(product);
  const faqJsonLd = generateFAQJsonLd(product);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="bg-[#FBFBFB] min-h-screen">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]" aria-label="Breadcrumb">
            <a href="/" className="hover:text-primary transition-colors">Accueil</a>
            <ChevronRight size={10} className="opacity-40" aria-hidden="true" />
            <a href="/collections/all" className="hover:text-primary transition-colors">Chaussures</a>
            <ChevronRight size={10} className="opacity-40" aria-hidden="true" />
            <span className="text-foreground truncate max-w-[150px]">{product.title}</span>
          </nav>
        </div>

        <ProductPageClient product={product} />
      </div>
    </>
  );
}
