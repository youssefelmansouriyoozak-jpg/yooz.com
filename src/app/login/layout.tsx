import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - Accédez à Votre Compte YOOZAK",
  description: "Connectez-vous à votre compte YOOZAK pour suivre vos commandes, accéder à vos avantages exclusifs et gérer vos informations personnelles.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://yoozak.com/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
