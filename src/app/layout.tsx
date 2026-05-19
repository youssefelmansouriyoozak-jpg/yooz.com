import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/header";
import NewsletterFooter from "@/components/sections/newsletter-footer";
import { CartProvider } from "@/hooks/use-cart";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import DiscountNotification from "@/components/discount-notification";
import { Suspense } from "react";
import { FloatingShareButton } from "@/components/ui/share-button";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const siteDescription = "YOOZAK - Boutique en ligne de chaussures au Maroc. Achetez sneakers, bottines, escarpins, mocassins, sandales pour homme et femme. Livraison gratuite partout au Maroc. Paiement à la livraison.";
const siteTitle = "YOOZAK | Chaussures Homme & Femme au Maroc - Livraison Gratuite";
const ogImageUrl = "https://yoozak.com/og-image.png";

// SEO Keywords for Morocco shoe market
const seoKeywords = [
  "chaussures maroc",
  "achat chaussures en ligne maroc",
  "chaussures homme maroc",
  "chaussures femme maroc",
  "sneakers maroc",
  "bottines femme maroc",
  "escarpins maroc",
  "mocassins homme maroc",
  "sandales maroc",
  "baskets maroc",
  "chaussures pas cher maroc",
  "livraison gratuite chaussures maroc",
  "paiement à la livraison maroc",
  "boutique chaussures casablanca",
  "chaussures rabat",
  "chaussures marrakech",
  "sabots femme maroc",
  "boots homme maroc",
  "yoozak",
  "yoozak maroc",
];

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | YOOZAK Maroc",
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: "YOOZAK" }],
  creator: "YOOZAK",
  publisher: "YOOZAK",
  metadataBase: new URL("https://yoozak.com"),
  alternates: {
    canonical: "https://yoozak.com",
    languages: {
      "fr-MA": "https://yoozak.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://yoozak.com",
    siteName: "YOOZAK",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "YOOZAK - Chaussures Homme & Femme au Maroc - Nouvelle Collection 2026",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
    creator: "@yoozak",
  },
  verification: {
    google: "votre-code-google-search-console",
  },
  category: "ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <link rel="dns-prefetch" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <link rel="preconnect" href="https://wjnerekpjeqqbejnvjcd.supabase.co" />
        <link rel="dns-prefetch" href="https://wjnerekpjeqqbejnvjcd.supabase.co" />
        
        {/* Meta Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '525469750001745');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=525469750001745&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} antialiased font-sans`}>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="fd8e1424-75a8-477b-bd75-a8df03ff1192"
        />
        <CartProvider>
          <Header />
          <Suspense>
            <DiscountNotification />
          </Suspense>
<main>{children}</main>
            <FloatingShareButton />
            <NewsletterFooter />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
