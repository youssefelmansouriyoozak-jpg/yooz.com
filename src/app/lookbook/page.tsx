'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Eye, Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

// JSON-LD for Lookbook page (injected via layout or inline script)
const lookbookJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Lookbook YOOZAK 2026",
  description: "Explorez nos univers mode et trouvez l'inspiration pour vos plus beaux looks au Maroc",
  url: "https://yoozak.com/lookbook",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 6,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Urban Chic", description: "Street Style Parisien" },
      { "@type": "ListItem", position: 2, name: "Élégance Nocturne", description: "Soirées & Événements" },
      { "@type": "ListItem", position: 3, name: "Bohème Libre", description: "Escapades & Aventures" },
      { "@type": "ListItem", position: 4, name: "Power Business", description: "Conquête & Ambition" },
      { "@type": "ListItem", position: 5, name: "Summer Vibes", description: "Soleil & Légèreté" },
      { "@type": "ListItem", position: 6, name: "Winter Luxe", description: "Chaleur & Raffinement" },
    ],
  },
};

const lookbookData = [
  {
    id: '1',
    title: 'Urban Chic',
    subtitle: 'Street Style Parisien',
    description: 'L\'alliance parfaite entre confort urbain et élégance française. Des sneakers raffinées aux mocassins audacieux.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
    products: [
      { name: 'Sneakers Cloud', price: '189€', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80' },
      { name: 'Mocassin Doré', price: '229€', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80' },
    ],
    color: 'from-amber-900/80 via-amber-800/60 to-transparent',
    accent: 'amber'
  },
  {
    id: '2',
    title: 'Élégance Nocturne',
    subtitle: 'Soirées & Événements',
    description: 'Des escarpins scintillants aux sandales sophistiquées pour illuminer vos plus belles soirées.',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467b22?w=1200&q=80',
    products: [
      { name: 'Escarpin Velours', price: '269€', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80' },
      { name: 'Sandale Crystal', price: '299€', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80' },
    ],
    color: 'from-purple-900/80 via-purple-800/60 to-transparent',
    accent: 'purple'
  },
  {
    id: '3',
    title: 'Bohème Libre',
    subtitle: 'Escapades & Aventures',
    description: 'L\'esprit bohème se décline en sandales tressées et bottines western pour les âmes voyageuses.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
    products: [
      { name: 'Sandale Artisan', price: '159€', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
      { name: 'Bottine Country', price: '249€', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80' },
    ],
    color: 'from-emerald-900/80 via-emerald-800/60 to-transparent',
    accent: 'emerald'
  },
  {
    id: '4',
    title: 'Power Business',
    subtitle: 'Conquête & Ambition',
    description: 'Des derbies structurées aux mocassins impeccables pour affirmer votre présence en toute occasion.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
    products: [
      { name: 'Derby Executive', price: '289€', image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=400&q=80' },
      { name: 'Mocassin Premium', price: '259€', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80' },
    ],
    color: 'from-slate-900/80 via-slate-800/60 to-transparent',
    accent: 'slate'
  },
  {
    id: '5',
    title: 'Summer Vibes',
    subtitle: 'Soleil & Légèreté',
    description: 'Sandales aériennes et espadrilles colorées pour un été placé sous le signe du style.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    products: [
      { name: 'Espadrille Côte', price: '129€', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80' },
      { name: 'Sandale Riviera', price: '149€', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
    ],
    color: 'from-rose-900/80 via-rose-800/60 to-transparent',
    accent: 'rose'
  },
  {
    id: '6',
    title: 'Winter Luxe',
    subtitle: 'Chaleur & Raffinement',
    description: 'Bottes fourrées et bottines en cuir pour traverser l\'hiver avec style et confort.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80',
    products: [
      { name: 'Botte Fourrée', price: '329€', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80' },
      { name: 'Chelsea Luxe', price: '279€', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80' },
    ],
    color: 'from-stone-900/80 via-stone-800/60 to-transparent',
    accent: 'stone'
  }
];

function LookbookCard({ look, index }: { look: typeof lookbookData[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative min-h-[85vh] md:min-h-screen flex items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={look.image}
          alt={look.title}
          fill
          className={`object-cover transition-transform duration-[2s] ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${look.color}`} />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className={`max-w-2xl ${isEven ? '' : 'md:ml-auto'}`}>
          <motion.span
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-white/70 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-3 md:mb-4"
          >
            Look #{index + 1} — {look.subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-4 md:mb-6 leading-none"
          >
            {look.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-sm md:text-lg max-w-lg mb-6 md:mb-10 leading-relaxed"
          >
            {look.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12"
          >
            {look.products.map((product, i) => (
              <div
                key={i}
                className="group/product flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-2 pr-4 md:pr-5 hover:bg-white/20 transition-all cursor-pointer border border-white/10"
              >
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white/20">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-[11px] md:text-sm">{product.name}</p>
                  <p className="text-white/70 font-black text-xs md:text-sm">{product.price}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            <Link
              href="/collections/all"
              className="group flex items-center gap-3 bg-white text-foreground px-5 md:px-8 py-3 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              <ShoppingBag size={16} />
              Shop the Look
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 md:px-6 py-3 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20">
              <Heart size={16} />
              Sauvegarder
            </button>
          </motion.div>
        </div>
      </div>

      <div className={`absolute bottom-6 md:bottom-10 ${isEven ? 'right-4 md:right-10' : 'left-4 md:left-10'} text-white/30 text-[100px] md:text-[200px] font-black leading-none pointer-events-none select-none`}>
        0{index + 1}
      </div>
    </motion.div>
  );
}

export default function LookbookPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lookbookJsonLd) }}
      />
      
      <div className="min-h-screen bg-stone-950">
      <section className="relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
            alt="Lookbook Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-stone-950" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 border border-white/20"
          >
            <Sparkles size={14} />
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em]">Collection 2025</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tight mb-4 md:mb-6"
          >
            Lookbook
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-sm md:text-xl max-w-2xl mx-auto mb-8 md:mb-12"
          >
            Explorez nos univers mode et trouvez l&apos;inspiration pour vos plus beaux looks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4 md:gap-6"
          >
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-white">6</p>
              <p className="text-[9px] md:text-xs text-white/50 uppercase tracking-widest">Looks</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-white">12</p>
              <p className="text-[9px] md:text-xs text-white/50 uppercase tracking-widest">Produits</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-black text-white">∞</p>
              <p className="text-[9px] md:text-xs text-white/50 uppercase tracking-widest">Style</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <Eye size={20} className="animate-bounce" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em]">Défiler</span>
          </div>
        </motion.div>
      </section>

      {lookbookData.map((look, index) => (
        <LookbookCard key={look.id} look={look} index={index} />
      ))}

      <section className="py-16 md:py-32 bg-stone-950 text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 md:mb-6"
          >
            Créez Votre Style
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-xl mx-auto mb-8 md:mb-12 text-sm md:text-base"
          >
            Explorez notre collection complète et composez vos propres looks uniques.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-3 bg-white text-foreground px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              <ShoppingBag size={18} />
              Découvrir la Collection
              <ArrowRight size={16} />
            </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
