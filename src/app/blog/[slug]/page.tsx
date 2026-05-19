import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, blogArticles, categoryLabels, getLatestArticles } from '@/lib/blog-data';
import { Clock, ArrowLeft, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { ShareButton } from '@/components/ui/share-button';

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

const defaultOgImage = "https://yoozak.com/og-image.png";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return { 
      title: 'Article non trouvé | YOOZAK',
      openGraph: { images: [{ url: defaultOgImage, width: 1200, height: 630 }] },
      twitter: { card: "summary_large_image", images: [defaultOgImage] },
    };
  }

  const imageUrl = article.image || defaultOgImage;

  return {
    title: `${article.title} | Yoozak Mode Blog`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Yoozak Mode Blog`,
      description: article.excerpt,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
      type: "article",
      authors: [article.author],
      siteName: "YOOZAK",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Yoozak Mode Blog`,
      description: article.excerpt,
      images: [imageUrl],
    },
  };
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  
  return (
    <div className="prose prose-lg max-w-none">
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        
        if (!trimmedLine) return <div key={index} className="h-4" />;
        
        if (trimmedLine.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 mt-8 first:mt-0">
              {trimmedLine.slice(2)}
            </h1>
          );
        }
        
        if (trimmedLine.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 mt-8 text-foreground">
              {trimmedLine.slice(3)}
            </h2>
          );
        }
        
        if (trimmedLine.startsWith('### ')) {
          return (
            <h3 key={index} className="text-lg md:text-xl font-bold mb-3 mt-6 text-foreground">
              {trimmedLine.slice(4)}
            </h3>
          );
        }
        
        if (trimmedLine.startsWith('- **')) {
          const match = trimmedLine.match(/- \*\*(.+?)\*\*\s*:\s*(.+)/);
          if (match) {
            return (
              <div key={index} className="flex gap-3 mb-3 pl-4">
                <span className="text-primary font-bold">•</span>
                <p>
                  <strong className="font-black">{match[1]}</strong>: {match[2]}
                </p>
              </div>
            );
          }
        }
        
        if (trimmedLine.startsWith('- ')) {
          return (
            <div key={index} className="flex gap-3 mb-2 pl-4">
              <span className="text-primary font-bold">•</span>
              <p>{trimmedLine.slice(2)}</p>
            </div>
          );
        }
        
        if (/^\d+\.\s\*\*/.test(trimmedLine)) {
          const match = trimmedLine.match(/^(\d+)\.\s\*\*(.+?)\*\*\s*:\s*(.+)/);
          if (match) {
            return (
              <div key={index} className="flex gap-3 mb-3 pl-4">
                <span className="text-primary font-black text-sm w-6">{match[1]}.</span>
                <p>
                  <strong className="font-black">{match[2]}</strong>: {match[3]}
                </p>
              </div>
            );
          }
        }
        
        if (/^\d+\.\s/.test(trimmedLine)) {
          const match = trimmedLine.match(/^(\d+)\.\s(.+)/);
          if (match) {
            return (
              <div key={index} className="flex gap-3 mb-2 pl-4">
                <span className="text-primary font-black text-sm w-6">{match[1]}.</span>
                <p>{match[2]}</p>
              </div>
            );
          }
        }
        
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {trimmedLine}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    tendances: 'bg-rose-500/10 text-rose-600',
    conseils: 'bg-amber-500/10 text-amber-600',
    nouveautes: 'bg-emerald-500/10 text-emerald-600',
    entretien: 'bg-sky-500/10 text-sky-600',
  };

  const relatedArticles = getLatestArticles(4).filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-10 md:pb-16">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Retour au blog</span>
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${categoryColors[article.category]}`}>
                {categoryLabels[article.category]}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs">
                <Clock size={12} /> {article.readTime}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4 md:mb-6 max-w-4xl leading-tight">
              {article.title}
            </h1>
            
<div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/70 text-xs md:text-sm">
                <span className="flex items-center gap-2">
                  <User size={14} />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(article.date).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <ShareButton variant="icon" title={article.title} className="bg-white/20 hover:bg-white/30 border-white/30 text-white" />
              </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-foreground font-medium mb-8 md:mb-12 leading-relaxed border-l-4 border-primary pl-6">
              {article.excerpt}
            </p>
            
            <MarkdownContent content={article.content} />
            
<div className="mt-10 md:mt-14 pt-8 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-muted-foreground" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tags</span>
                  </div>
                  <ShareButton title={article.title} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 md:mb-12 text-center">
              Articles Similaires
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                  <article>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] mb-4 bg-muted">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-2 ${categoryColors[related.category]}`}>
                      {categoryLabels[related.category]}
                    </span>
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
            Envie de découvrir plus ?
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            Tous les articles <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
