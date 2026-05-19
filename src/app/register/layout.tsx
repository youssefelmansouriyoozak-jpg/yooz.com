import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - Créez Votre Compte & Obtenez -10%",
  description: "Créez votre compte YOOZAK et recevez immédiatement 10% de réduction sur votre première commande. Livraison gratuite partout au Maroc. Paiement à la livraison.",
  keywords: [
    "créer compte yoozak",
    "inscription yoozak",
    "réduction première commande",
    "code promo yoozak",
    "nouveau client yoozak",
  ],
  alternates: {
    canonical: "https://yoozak.com/register",
  },
  openGraph: {
    title: "Inscription | -10% sur votre 1ère commande | YOOZAK",
    description: "Créez votre compte et recevez 10% de réduction immédiate. Livraison gratuite au Maroc.",
    url: "https://yoozak.com/register",
    type: "website",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
