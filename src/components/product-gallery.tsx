"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  images: {
    edges: {
      node: {
        url: string
        altText?: string
      }
    }[]
  }
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const thumbnailsRef = React.useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.edges.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.edges.length - 1 ? 0 : prev + 1))
  }

  React.useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[selectedIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [selectedIndex])

  const currentImage = images.edges[selectedIndex]?.node

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white border border-border/50 group">
        <div className="absolute inset-0 p-4 md:p-8">
          <Image
            src={currentImage?.url || ''}
            alt={currentImage?.altText || title}
            fill
            className="object-contain transition-transform duration-500"
            priority
          />
        </div>
        
        <div className="absolute top-4 md:top-6 left-4 md:left-6 flex flex-col gap-2">
          <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">Nouveauté</span>
          <span className="bg-white/90 backdrop-blur-md text-foreground text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">Collection 2026</span>
        </div>

        {images.edges.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {images.edges.length > 1 && (
        <div 
          ref={thumbnailsRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.edges.map((edge, i) => (
            <button
              key={edge.node.url}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300",
                selectedIndex === i 
                  ? "border-primary ring-2 ring-primary/20" 
                  : "border-border/50 hover:border-primary/50"
              )}
            >
              <Image
                src={edge.node.url}
                alt={edge.node.altText || `${title} - ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
