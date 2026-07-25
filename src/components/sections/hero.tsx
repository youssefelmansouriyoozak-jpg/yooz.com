"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import TrustBar from "./trust-bar";

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroImage =
    "https://ohmavxqmvgwkngxjfsuy.supabase.co/storage/v1/object/public/yoozak/BANEER.jpeg";

  if (!mounted) {
    return (
      <div
        className="h-[280px] sm:h-[360px] md:h-[56.25vw] bg-gray-100 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      aria-label="Bannière principale"
    >
      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <div
        className="
          relative
          w-full
          h-[280px]
          sm:h-[360px]
          md:h-[56.25vw]
          md:min-h-[500px]
          lg:max-h-[900px]
        "
      >
        {/* ========================================================= */}
        {/* IMAGE */}
        {/* ========================================================= */}

        {!imageError ? (
          <img
            src={heroImage}
            alt="Collection YOOZAK - Nouvelle collection 2026"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
            "
            onError={() => {
              console.error("❌ Impossible de charger l'image Hero");
              setImageError(true);
            }}
            onLoad={() => {
              console.log("✅ Image Hero chargée correctement");
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center px-4">
            <div className="text-center">
              <p className="text-red-700 font-bold">
                Image Hero impossible à charger
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Vérifie le lien Supabase
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* OVERLAY */}
        {/* ========================================================= */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-white/90
            via-white/40
            to-transparent

            sm:from-white/85
            sm:via-white/30
            sm:to-transparent

            md:from-white/80
            md:via-white/20
            md:to-transparent
          "
          aria-hidden="true"
        />

        {/* ========================================================= */}
        {/* CONTENT */}
        {/* ========================================================= */}

        <div className="absolute inset-0 z-10">

          <div
            className="
              container
              h-full
              max-w-[1200px]
              mx-auto

              px-4
              sm:px-6
              md:px-8
            "
          >

            <div className="h-full flex items-center">

              <div
                className="
                  w-full
                  max-w-[650px]

                  pt-2
                  sm:pt-0
                "
              >

                {/* ================================================= */}
                {/* BADGE */}
                {/* ================================================= */}

                <div
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    sm:gap-2

                    px-2.5
                    sm:px-3

                    py-1

                    bg-primary/10
                    rounded-full

                    mb-3
                    sm:mb-4
                    md:mb-6

                    animate-in
                    fade-in
                    slide-in-from-bottom
                    duration-500
                  "
                >
                  <span
                    className="
                      w-1.5
                      h-1.5
                      sm:w-2
                      sm:h-2

                      bg-primary
                      rounded-full
                      animate-pulse
                    "
                  />

                  <span
                    className="
                      text-[8px]
                      sm:text-[9px]
                      md:text-[10px]

                      font-black
                      uppercase
                      tracking-[0.12em]
                      sm:tracking-[0.16em]
                      md:tracking-[0.2em]

                      text-primary
                    "
                  >
                    Nouvelle Collection 2026
                  </span>
                </div>

                {/* ================================================= */}
                {/* TITLE */}
                {/* ================================================= */}

                <h1
                  className="
                    editorial-title
                    text-[#1D1D1B]

                    text-[38px]
                    sm:text-[50px]
                    md:text-[72px]
                    lg:text-[84px]

                    leading-[0.9]

                    mb-4
                    sm:mb-5
                    md:mb-8

                    font-black
                    uppercase

                    tracking-[-0.04em]
                    sm:tracking-[-0.045em]
                    md:tracking-tighter

                    animate-in
                    fade-in
                    slide-in-from-left
                    duration-700
                  "
                >
                  L'élégance
                  <br />

                  <span
                    className="
                      italic
                      font-light
                      lowercase
                      opacity-80

                      text-[36px]
                      sm:text-[48px]
                      md:text-[68px]
                      lg:text-[80px]
                    "
                  >
                    à chaque pas
                  </span>
                </h1>

                {/* ================================================= */}
                {/* LINE */}
                {/* ================================================= */}

                <div
                  className="
                    w-[55px]
                    sm:w-[70px]
                    md:w-[100px]

                    h-[2px]
                    sm:h-[3px]
                    md:h-[4px]

                    bg-primary

                    mb-4
                    sm:mb-6
                    md:mb-10
                  "
                />

                {/* ================================================= */}
                {/* CTA */}
                {/* ================================================= */}

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    sm:gap-3
                    md:gap-4
                  "
                >
                  <a
                    href="/collections/all"
                    className="
                      group

                      flex
                      items-center
                      justify-center

                      gap-1.5
                      sm:gap-2
                      md:gap-3

                      bg-primary
                      text-white

                      px-5
                      sm:px-7
                      md:px-10

                      py-2.5
                      sm:py-3
                      md:py-5

                      rounded-full

                      text-[9px]
                      sm:text-[11px]
                      md:text-sm

                      font-black
                      uppercase

                      tracking-[0.12em]
                      md:tracking-widest

                      hover:bg-primary/90

                      transition-all
                      duration-300

                      shadow-[0_15px_30px_-10px_rgba(var(--primary-rgb),0.4)]

                      active:scale-95
                    "
                    aria-label="Découvrir la nouvelle collection de chaussures"
                  >
                    Découvrir

                    <ChevronRight
                      size={14}
                      className="
                        sm:w-4
                        sm:h-4
                        group-hover:translate-x-1
                        transition-transform
                      "
                      aria-hidden="true"
                    />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TRUST BAR */}
      {/* ========================================================= */}

      <TrustBar />
    </section>
  );
};

export default HeroSection;