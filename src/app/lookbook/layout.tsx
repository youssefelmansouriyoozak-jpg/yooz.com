import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook Mode 2026 - Inspirations & Tendances Chaussures",
  description: "Explorez notre lookbook mode 2026. Découvrez les dernières tendances chaussures et trouvez l'inspiration pour vos plus beaux looks au Maroc. 6 univers mode exclusifs.",
  keywords: [
    "lookbook mode",
    "tendances chaussures 2026",
    "inspiration mode maroc",
    "style chaussures",
    "looks mode",
    "idées tenues",
    "yoozak lookbook",
  ],
  alternates: {
    canonical: "https://yoozak.com/lookbook",
  },
  openGraph: {
    title: "Lookbook Mode 2026 | YOOZAK Maroc",
    description: "Découvrez nos univers mode et trouvez l'inspiration pour vos plus beaux looks. 6 collections tendance.",
    url: "https://yoozak.com/lookbook",
    type: "website",
    images: [
      {
        url: "https://yoozak.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "YOOZAK Lookbook Mode 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lookbook Mode 2026 | YOOZAK",
    description: "Découvrez nos univers mode et trouvez l'inspiration pour vos plus beaux looks.",
    images: ["https://yoozak.com/og-image.png"],
  },
};

export default function LookbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
