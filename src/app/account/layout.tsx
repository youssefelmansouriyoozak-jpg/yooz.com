import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Compte - Gérer Mes Commandes | YOOZAK",
  description: "Gérez votre compte YOOZAK, suivez vos commandes en temps réel et accédez à vos avantages fidélité exclusifs.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://yoozak.com/account",
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
