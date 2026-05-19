import React from 'react';
import Image from 'next/image';

const categories = [
  {
    title: 'SANDALES',
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=600',
    cta: 'DÉCOUVRIR',
    href: '/collections/sandales'
  },
  {
    title: 'BASKETS',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
    cta: 'DÉCOUVRIR',
    href: '/collections/baskets-et-espadrilles'
  },
  {
    title: 'DERBIES',
    image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=600',
    cta: 'DÉCOUVRIR',
    href: '/collections/derbies'
  },
  {
    title: 'SACS',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    cta: 'DÉCOUVRIR',
    href: '/collections/sacs'
  }
];

const SeasonalCategories: React.FC = () => {
    return (
      <section className="bg-white py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[20px] md:text-[32px] font-bold text-[#1D1D1B] leading-tight mb-2 font-sans tracking-tight">
            La sélection Yoozak
          </h2>
          <div className="inline-block relative">
            <span className="bg-[#501111] text-white px-2 py-0.5 text-[18px] md:text-[28px] font-bold inline-block transform -skew-x-2">
              du moment !
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.href}
              className="group relative block overflow-hidden rounded-[1.5rem] md:rounded-[20px] aspect-[4/5] md:aspect-[3/4] brand-card-hover"
            >
              {/* Foreground Image */}
              <div className="relative w-full h-full bg-muted">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Visual Gradient Overlay for Legibility */}
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Text Content Container */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col items-start justify-end h-full">
                  {/* Title with Gold Accent Bar */}
                  <div className="mb-2 md:mb-3">
                    <div className="w-[30px] md:w-[40px] h-[2px] bg-[#9A771F] mb-1.5 md:mb-2" />
                    <h3 className="text-white text-[13px] md:text-[20px] font-black tracking-wide uppercase font-sans">
                      {category.title}
                    </h3>
                  </div>

                  {/* Button Label */}
                  <div className="border border-white/40 bg-transparent px-3 md:px-4 py-1.5 md:py-2 rounded-sm backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-[#1D1D1B]">
                    <span className="text-white group-hover:text-[#1D1D1B] text-[8px] md:text-[11px] font-bold uppercase tracking-widest leading-none">
                      {category.cta}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalCategories;
