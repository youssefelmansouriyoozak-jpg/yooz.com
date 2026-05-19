import { Metadata } from "next";
import Link from "next/link";
import { Home, Search, ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Non Trouvée | YOOZAK",
  description: "La page que vous recherchez n'existe pas ou a été déplacée. Découvrez notre collection de chaussures pour homme et femme avec livraison gratuite au Maroc.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#FBFBFB] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black text-primary/10 leading-none select-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Page introuvable
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée. 
            Pas de panique, découvrez nos collections de chaussures tendance.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary transition-all duration-300 shadow-lg"
          >
            <Home size={16} aria-hidden="true" />
            Retour à l'accueil
          </Link>
          
          <Link
            href="/collections/all"
            className="group flex items-center gap-3 bg-white border-2 border-foreground text-foreground px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            Voir nos produits
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Liens populaires
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Liens populaires">
            <Link href="/collections/nos-arrivages" className="text-foreground hover:text-primary transition-colors font-medium">
              Nouveautés
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/collections/best-sellers" className="text-foreground hover:text-primary transition-colors font-medium">
              Best Sellers
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/collections/les-bonnes-affaires" className="text-foreground hover:text-primary transition-colors font-medium">
              Promotions
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
