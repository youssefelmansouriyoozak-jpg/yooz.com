import Image from 'next/image';
import Link from 'next/link';
import { blogArticles, categoryLabels, BlogArticle } from '@/lib/blog-data';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ShareButton } from '@/components/ui/share-button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Mode & Chaussures - Conseils, Tendances & Nouveautés',
  description: 'Découvrez nos articles conseils mode, tendances chaussures 2026 et nouveautés. Guide d\'achat, entretien chaussures et inspirations style au Maroc.',
  keywords: [
    'blog mode maroc',
    'tendances chaussures 2026',
    'conseils mode',
    'entretien chaussures',
    'style maroc',
    'nouveautés chaussures',
    'guide achat chaussures',
  ],
  alternates: {
    canonical: 'https://yoozak.com/blog',
  },
  openGraph: {
    title: 'Blog Mode & Chaussures | YOOZAK',
    description: 'Découvrez nos articles conseils, tendances mondiales et nouveautés dans le monde des chaussures.',
    images: [{ url: 'https://yoozak.com/og-image.png', width: 1200, height: 630 }],
    type: 'website',
    siteName: 'YOOZAK',
    url: 'https://yoozak.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Mode & Chaussures | YOOZAK',
    description: 'Découvrez nos articles conseils, tendances mondiales et nouveautés dans le monde des chaussures.',
    images: ['https://yoozak.com/og-image.png'],
  },
};

// JSON-LD for Blog page
const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "YOOZAK Mode Blog",
  description: "Blog mode et chaussures - Conseils, tendances et nouveautés",
  url: "https://yoozak.com/blog",
  publisher: {
    "@type": "Organization",
    name: "YOOZAK",
    logo: {
      "@type": "ImageObject",
      url: "https://yoozak.com/og-image.png",
    },
  },
  blogPost: blogArticles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    url: `https://yoozak.com/blog/${article.slug}`,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "YOOZAK",
    },
  })),
};

function ArticleCard({ article, featured = false }: { article: BlogArticle; featured?: boolean }) {
  const categoryColors: Record<string, string> = {
    tendances: 'bg-rose-500/10 text-rose-600',
    conseils: 'bg-amber-500/10 text-amber-600',
    nouveautes: 'bg-emerald-500/10 text-emerald-600',
    entretien: 'bg-sky-500/10 text-sky-600',
  };

  if (featured) {
    return (
      <Link href={`/blog/${article.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${categoryColors[article.category]}`}>
                {categoryLabels[article.category]}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
                <Clock size={12} /> {article.readTime}
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tight mb-3 md:mb-4 leading-tight max-w-4xl">
              {article.title}
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mb-4 md:mb-6 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-white group-hover:text-primary transition-colors">
              <span className="text-xs font-black uppercase tracking-widest">Lire l&apos;article</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] mb-4 md:mb-6 bg-muted">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 md:top-4 md:left-4">
            <span className={`px-3 py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${categoryColors[article.category]}`}>
              {categoryLabels[article.category]}
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-2 md:mb-3 text-muted-foreground text-[10px] md:text-xs">
            <span className="font-medium">{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={10} /> {article.readTime}
            </span>
          </div>
          <h3 className="text-base md:text-xl font-black uppercase tracking-tight mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-3 md:mb-4 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Lire</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [featuredArticle, ...otherArticles] = blogArticles;
  
  const categories = ['all', 'tendances', 'conseils', 'nouveautes', 'entretien'] as const;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      
      <div className="min-h-screen bg-[#FBFBFB]">
        <section className="pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 md:mb-6">
                <Sparkles size={14} />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Yoozak Mode Blog</span>
              </div>
<h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight mb-4 md:mb-6">
                Conseils & Tendances
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg mb-4">
                Explorez l&apos;univers de la chaussure : tendances mondiales, conseils d&apos;experts et nouveautés exclusives.
              </p>
              <ShareButton title="Yoozak Mode Blog - Conseils & Tendances Chaussures" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                  cat === 'all'
                    ? 'bg-foreground text-background'
                    : 'bg-white border border-border/50 hover:bg-muted'
                }`}
              >
                {cat === 'all' ? 'Tous les articles' : categoryLabels[cat as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>

          <div className="mb-10 md:mb-16">
            <ArticleCard article={featuredArticle} featured />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 md:mb-6">
            Restez Informé
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et tendances directement dans votre boîte mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              S&apos;inscrire
            </button>
          </form>
          </div>
        </section>
      </div>
    </>
  );
}
