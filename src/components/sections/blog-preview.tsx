'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getLatestArticles, categoryLabels } from '@/lib/blog-data';
import { ArrowRight, Clock, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPreview() {
  const articles = getLatestArticles(3);

  const categoryColors: Record<string, string> = {
    tendances: 'bg-rose-500/10 text-rose-600 border-rose-200',
    conseils: 'bg-amber-500/10 text-amber-600 border-amber-200',
    nouveautes: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    entretien: 'bg-sky-500/10 text-sky-600 border-sky-200',
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-stone-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 text-center md:text-left gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
            >
              <Sparkles size={14} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Yoozak Mode Blog</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-5xl font-black uppercase tracking-tight mb-3 md:mb-4"
            >
              Conseils & Tendances
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-md font-medium text-xs md:text-base"
            >
              Explorez l&apos;univers de la chaussure : nouveautés mondiales, guides d&apos;experts et inspirations style.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/blog" 
              className="group flex items-center gap-3 md:gap-4 bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <BookOpen size={16} />
              Découvrir le blog 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link href={`/blog/${article.slug}`} className="group block h-full">
                <article className="h-full flex flex-col bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/30">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={`${article.title} - Article de blog YOOZAK sur ${categoryLabels[article.category]}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <span className={`px-3 py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${categoryColors[article.category]}`}>
                        {categoryLabels[article.category]}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                        Lire <ArrowRight size={10} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-3 text-muted-foreground text-[10px] md:text-xs">
                      <span className="font-medium">
                        {new Date(article.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short'
                        })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-sm md:text-lg font-black uppercase tracking-tight mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-[11px] md:text-sm line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 md:mt-16 text-center md:hidden"
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest"
          >
            Voir tous les articles <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
