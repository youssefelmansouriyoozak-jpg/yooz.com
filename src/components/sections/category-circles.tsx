"use client";

import React from 'react';
import Image from 'next/image';
import Marquee from "react-fast-marquee";

const categories = [
  { 
    label: 'BOTTES & BOTTINES', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Bottine-1767180720685.png?width=8000&height=8000&resize=contain', 
    href: '/collections/bottes-et-bottines' 
  },
  { 
    label: 'BASKETS', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Baskets-1767180720694.png?width=8000&height=8000&resize=contain', 
    href: '/collections/baskets-et-espadrilles' 
  },
  { 
    label: 'MOCASSINS', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Mocassin-1767180720686.png?width=8000&height=8000&resize=contain', 
    href: '/collections/mocassins' 
  },
  { 
    label: 'ESCARPINS', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Escarpin-1767180720687.png?width=8000&height=8000&resize=contain', 
    href: '/collections/escarpins-1' 
  },
  { 
    label: 'DERBIES', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/derbies-1767180720685.png?width=8000&height=8000&resize=contain', 
    href: '/collections/derbies' 
  },
  { 
    label: 'SANDALES', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Sandales-1767180720694.png?width=8000&height=8000&resize=contain', 
    href: '/collections/sandales' 
  },
  { 
    label: 'MULES', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Mules-1767180721165.png?width=8000&height=8000&resize=contain', 
    href: '/collections/mules-1' 
  },
  { 
    label: 'SABOTS', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Sabot-1767180720688.png?width=8000&height=8000&resize=contain', 
    href: '/collections/sabots' 
  },
  { 
    label: 'SACS', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/fd8e1424-75a8-477b-bd75-a8df03ff1192/Sacs-1767180720694.png?width=8000&height=8000&resize=contain', 
    href: '/collections/sacs' 
  },
];

export default function CategoryCircles() {
  return (
    <section className="w-full py-4 md:py-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Marquee
          gradient={false}
          speed={30}
          pauseOnHover={true}
          className="flex items-start"
        >
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.href}
              className="flex flex-col items-center group transition-transform duration-300 hover:scale-105 w-[100px] md:w-[150px] mx-2 md:mx-4"
            >
              {/* Circular Image Container */}
              <div 
                className="relative w-[70px] h-[70px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden mb-3 md:mb-4 border border-transparent group-hover:border-primary/20 transition-colors bg-[#F5F5F5] shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="(max-width: 768px) 70px, 110px"
                  className="object-contain"
                  priority={index < 8}
                />
              </div>

              {/* Category Label */}
              <span className="text-[10px] md:text-[11px] font-black text-[#1D1D1B] uppercase tracking-[0.08em] text-center px-1 leading-tight whitespace-nowrap">
                {category.label}
              </span>
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
