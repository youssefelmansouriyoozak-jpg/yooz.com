import React from 'react';
import Image from 'next/image';

const footwearItems = [
  {
    title: 'SANDALES',
    video: null,
    image: 'https://ohmavxqmvgwkngxjfsuy.supabase.co/storage/v1/object/public/yoozak/SDL.jpeg ',
    href: '/collections/bottes-et-bottines',
    size: 'large'
  },
  {
    title: 'CHAUSSURS',
    video: null,
    image: 'https://ohmavxqmvgwkngxjfsuy.supabase.co/storage/v1/object/public/yoozak/CHAUSS.jpeg',
    href: '/collections/chaussures',
    size: 'small'
  },
  {
    title: 'SABOT',
    video: null,
    image: 'https://ohmavxqmvgwkngxjfsuy.supabase.co/storage/v1/object/public/yoozak/SAB.jpeg',
    href: '/collections/sabots',
    size: 'small'
  }
];

const FootwearGrid = () => {
    return (
    <section className="py-6 md:py-10 bg-white" aria-label="Catégories de chaussures">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-6 md:mb-10 text-center">Les essentiels de la saison</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {footwearItems.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-2xl bg-muted aspect-[4/5] md:aspect-auto ${
                item.size === 'large' ? 'col-span-2 lg:col-span-1 md:h-[500px]' : 'md:h-[500px]'
              }`}
              aria-label={`Voir la collection ${item.title}`}
            >
              {item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  aria-label={`Vidéo de présentation ${item.title}`}
                />
              ) : (
                <Image
                  src={item.image}
                  alt={`Collection ${item.title} - Chaussures YOOZAK`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <h3 className="text-sm md:text-2xl font-bold text-white mb-2 md:mb-3 uppercase tracking-tight">{item.title}</h3>
                <span className="inline-block px-4 md:px-6 py-1.5 md:py-2 bg-white text-foreground rounded-full text-[8px] md:text-xs font-black uppercase tracking-wider group-hover:bg-primary group-hover:text-white transition-colors">
                  Voir
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FootwearGrid;
