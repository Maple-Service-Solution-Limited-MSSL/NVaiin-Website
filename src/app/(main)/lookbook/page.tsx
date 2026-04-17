'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────
interface LookbookImage {
  id: string
  imageUrl: string
  title: string
  seasonLabel: string
  displayOrder: number
  isVisible: boolean
}

// ─── Fallback Images ──────────────────────────────────────────
const FALLBACK_IMAGES: LookbookImage[] = [
  {
    id: 'fb-1',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231204_005221.jpg?v=1701670313',
    title: "N'VAIIN WHITE TEE",
    seasonLabel: 'SEASON 01 — ESSENTIALS',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'fb-2',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231203_141648.jpg?v=1701631462',
    title: "N'VAIIN BLACK TEE",
    seasonLabel: 'SEASON 01 — ESSENTIALS',
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: 'fb-3',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231204_005221.jpg?v=1701670313',
    title: 'EDITORIAL LOOK 01',
    seasonLabel: 'SEASON 01 — EDITORIAL',
    displayOrder: 3,
    isVisible: true,
  },
  {
    id: 'fb-4',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231203_141648.jpg?v=1701631462',
    title: 'EDITORIAL LOOK 02',
    seasonLabel: 'SEASON 01 — EDITORIAL',
    displayOrder: 4,
    isVisible: true,
  },
  {
    id: 'fb-5',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231204_005221.jpg?v=1701670313',
    title: 'EDITORIAL LOOK 03',
    seasonLabel: 'SEASON 01 — EDITORIAL',
    displayOrder: 5,
    isVisible: true,
  },
  {
    id: 'fb-6',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231203_141648.jpg?v=1701631462',
    title: 'DARK SIDE TEE',
    seasonLabel: 'SEASON 01 — SIGNATURE',
    displayOrder: 6,
    isVisible: true,
  },
  {
    id: 'fb-7',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231204_005221.jpg?v=1701670313',
    title: 'PURPOSE TEE',
    seasonLabel: 'SEASON 01 — CORE',
    displayOrder: 7,
    isVisible: true,
  },
  {
    id: 'fb-8',
    imageUrl: 'https://www.nvaiin.com/cdn/shop/files/PhotoRoom_20231203_141648.jpg?v=1701631462',
    title: 'SIGNATURE BLACK',
    seasonLabel: 'SEASON 01 — SIGNATURE',
    displayOrder: 8,
    isVisible: true,
  },
]

// ─── Animation Variants ──────────────────────────────────────
const letterVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07 + 0.3,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const viewOnce = { once: true, margin: '-80px' as const }

// ─── Section 1: Enhanced Hero ─────────────────────────────────
function LookbookHero() {
  const letters = 'LOOKBOOK'.split('')

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center bg-nv-black overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32">
        {/* Staggered letter heading */}
        <h1 className="font-anton text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] uppercase tracking-tight text-nv-white leading-[0.85] select-none overflow-hidden">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
        >
          <span className="font-bebas text-nv-gold text-lg sm:text-xl md:text-2xl tracking-[0.3em]">
            SEASON 01 — EDITORIAL
          </span>
          <span className="hidden sm:block h-px flex-1 bg-nv-smoke max-w-[200px]" />
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 sm:mt-8 h-px bg-gradient-to-r from-nv-gold/60 via-nv-gold/30 to-transparent origin-left max-w-2xl"
        />

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-8"
        >
          <div>
            <span className="font-bebas text-[10px] tracking-[0.3em] text-nv-fog block">
              COLLECTION
            </span>
            <span className="font-mono-brand text-xs sm:text-sm text-nv-white">
              8 Looks
            </span>
          </div>
          <div className="w-px h-8 bg-nv-smoke" />
          <div>
            <span className="font-bebas text-[10px] tracking-[0.3em] text-nv-fog block">
              ESTABLISHED
            </span>
            <span className="font-mono-brand text-xs sm:text-sm text-nv-white">
              02.22.23
            </span>
          </div>
          <div className="w-px h-8 bg-nv-smoke" />
          <div>
            <span className="font-bebas text-[10px] tracking-[0.3em] text-nv-fog block">
              PHILOSOPHY
            </span>
            <span className="font-mono-brand text-xs sm:text-sm text-nv-white">
              Not Made in Vain
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-nv-gold/40 to-transparent animate-scroll-pulse" />
        <span className="font-bebas text-[9px] tracking-[0.3em] text-nv-fog/60 -rotate-90 absolute top-6">
          SCROLL
        </span>
      </motion.div>
    </section>
  )
}

// ─── Section 2: Horizontal Scroll Gallery ─────────────────────
function HorizontalScrollGallery({ images }: { images: LookbookImage[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const scrollProgressRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollImages = useMemo(
    () => (images.length > 0 ? images : FALLBACK_IMAGES),
    [images],
  )

  // Calculate dimensions
  const getImageWidth = useCallback(() => {
    if (typeof window === 'undefined') return 500
    const vw = window.innerWidth
    if (vw < 640) return vw * 0.85
    if (vw < 768) return vw * 0.7
    if (vw < 1024) return vw * 0.6
    return vw * 0.65
  }, [])

  const getGap = useCallback(() => {
    if (typeof window === 'undefined') return 24
    return window.innerWidth < 640 ? 16 : 32
  }, [])

  const getContainerHeight = useCallback(() => {
    const w = getImageWidth()
    const gap = getGap()
    return w * scrollImages.length + gap * (scrollImages.length - 1)
  }, [getImageWidth, getGap, scrollImages.length])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !trackRef.current) return

        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = getContainerHeight()
        const scrollableDistance = sectionHeight - window.innerHeight
        const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance))

        scrollProgressRef.current = progress

        const totalTrackWidth =
          getImageWidth() * scrollImages.length + getGap() * (scrollImages.length - 1)
        const maxTranslate = totalTrackWidth - window.innerWidth
        const translateX = progress * maxTranslate

        trackRef.current.style.transform = `translateX(-${translateX}px)`

        // Determine active image
        const imgW = getImageWidth()
        const g = getGap()
        const idx = Math.round(translateX / (imgW + g))
        setActiveIndex(Math.min(idx, scrollImages.length - 1))
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [scrollImages.length, getImageWidth, getGap, getContainerHeight])

  const imageWidth = getImageWidth()
  const gap = getGap()
  const containerHeight = getContainerHeight()

  return (
    <section
      ref={sectionRef}
      style={{ height: containerHeight }}
      className="relative bg-nv-black"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[2px] bg-nv-smoke">
          <motion.div
            className="h-full bg-nv-gold origin-left"
            style={{ width: `${((activeIndex + 1) / scrollImages.length) * 100}%` }}
          />
        </div>

        {/* Counter */}
        <div className="absolute top-6 sm:top-8 right-4 sm:right-8 z-20">
          <span className="font-mono-brand text-xs text-nv-fog/60">
            {String(activeIndex + 1).padStart(2, '0')} / {String(scrollImages.length).padStart(2, '0')}
          </span>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{ gap: `${gap}px`, paddingLeft: 'max(1rem, calc((100vw - var(--container-width)) / 2))' }}
        >
          {scrollImages.map((image, index) => (
            <div
              key={`hscroll-${image.id}-${index}`}
              className="relative flex-shrink-0 group"
              style={{
                width: imageWidth,
                height: typeof window !== 'undefined' ? window.innerHeight * 0.78 : 600,
              }}
            >
              {/* Image container */}
              <div className="relative w-full h-full overflow-hidden bg-nv-concrete contain-paint">
                <Image
                  src={image.imageUrl}
                  alt={image.title || `Lookbook ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Side gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 pointer-events-none">
                <div
                  className="transition-transform duration-500 ease-out group-hover:translate-y-[-8px]"
                >
                  {image.title && (
                    <h3 className="font-anton text-lg sm:text-2xl md:text-3xl text-nv-white uppercase tracking-tight leading-tight">
                      {image.title}
                    </h3>
                  )}
                  {image.seasonLabel && (
                    <p className="font-bebas text-nv-gold tracking-[0.2em] text-xs sm:text-sm mt-1.5 sm:mt-2">
                      {image.seasonLabel}
                    </p>
                  )}
                  <div className="mt-3 sm:mt-4 h-px bg-nv-gold/30 w-12 sm:w-16 transition-all duration-500 group-hover:w-24 sm:group-hover:w-32" />
                </div>
              </div>

              {/* Look number */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                <span className="font-bebas text-[10px] sm:text-xs tracking-[0.3em] text-nv-fog/40">
                  LOOK {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Left / Right fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-nv-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-nv-black/60 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}

// ─── Section 3: Magazine Grid ─────────────────────────────────
function MagazineGrid({ images }: { images: LookbookImage[] }) {
  const gridImages = useMemo(
    () => (images.length > 0 ? images : FALLBACK_IMAGES),
    [images],
  )

  // Masonry layout config: [col, span-rows] for each image
  const layoutConfig = [
    { col: 'full', aspect: 'aspect-[16/9]' },
    { col: 'left', aspect: 'aspect-[3/4]' },
    { col: 'right', aspect: 'aspect-[3/5]' },
    { col: 'left', aspect: 'aspect-[4/5]' },
    { col: 'right', aspect: 'aspect-[3/4]' },
    { col: 'left', aspect: 'aspect-square' },
    { col: 'right', aspect: 'aspect-[4/5]' },
  ]

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-nv-black"
    >
      {/* Section header */}
      <motion.div variants={fadeInUp} className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="font-bebas tracking-[0.3em] text-nv-fog text-xs block mb-2">
            THE EDITORIAL
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-nv-white">
            MAGAZINE
          </h2>
        </div>
        <div className="h-px flex-1 bg-nv-smoke max-w-[300px] hidden sm:block" />
      </motion.div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {gridImages.slice(0, 7).map((image, index) => {
          const config = layoutConfig[index] || { col: 'left', aspect: 'aspect-[4/5]' }
          const isFullWidth = config.col === 'full'

          return (
            <motion.div
              key={`grid-${image.id}-${index}`}
              variants={fadeInUp}
              className={`relative group overflow-hidden bg-nv-concrete ${
                isFullWidth ? 'sm:col-span-2' : ''
              }`}
            >
              <div
                className={`relative ${config.aspect} overflow-hidden contain-paint`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title || `Lookbook ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={
                    isFullWidth
                      ? '(max-width: 640px) 100vw, 100vw'
                      : '(max-width: 640px) 100vw, 50vw'
                  }
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Caption that slides up */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {image.title && (
                    <h3 className="font-anton text-lg sm:text-xl md:text-2xl text-nv-white uppercase tracking-tight leading-tight">
                      {image.title}
                    </h3>
                  )}
                  {image.seasonLabel && (
                    <p className="font-bebas text-nv-gold tracking-[0.2em] text-xs sm:text-sm mt-1">
                      {image.seasonLabel}
                    </p>
                  )}
                  <div className="mt-3 h-px bg-nv-gold/40 w-0 group-hover:w-16 transition-all duration-700" />
                </div>

                {/* Look number badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="font-mono-brand text-[10px] text-nv-fog/50 bg-black/40 backdrop-blur-sm px-2 py-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

// ─── Section 4: Statement / Quote ─────────────────────────────
function StatementSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-32 md:py-40 px-4 bg-nv-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* Top decorative lines */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center gap-4 mb-10 sm:mb-14"
        >
          <div className="h-px w-12 sm:w-20 bg-nv-gold/60" />
          <div className="h-px w-4 sm:w-6 bg-nv-gold" />
          <div className="h-px w-12 sm:w-20 bg-nv-gold/60" />
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-anton text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-nv-white leading-[1.15]">
            Every piece tells a story.
          </h2>
          <p className="font-mono-brand text-xs sm:text-sm text-nv-fog mt-6 sm:mt-8 max-w-xl mx-auto leading-relaxed">
            Crafted with intention. Worn with purpose. Each garment in the N&apos;VAIIN
            collection carries the weight of consciousness — not compromise.
          </p>
        </motion.blockquote>

        {/* Bottom decorative lines */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center gap-4 mt-10 sm:mt-14"
        >
          <div className="h-px w-12 sm:w-20 bg-nv-gold/60" />
          <div className="h-px w-4 sm:w-6 bg-nv-gold" />
          <div className="h-px w-12 sm:w-20 bg-nv-gold/60" />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Loading State ────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-nv-black">
      <div className="min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32">
        <div className="h-16 sm:h-24 md:h-32 bg-nv-concrete w-3/4 animate-pulse mb-4" />
        <div className="h-6 bg-nv-concrete w-1/3 animate-pulse mb-6" />
        <div className="h-px bg-nv-concrete w-1/2 animate-pulse" />
      </div>
      <div className="h-screen flex items-center gap-4 px-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="min-w-[85vw] md:min-w-[60vw] h-[70vh] bg-nv-concrete animate-pulse flex-shrink-0"
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export default function LookbookPage() {
  const [images, setImages] = useState<LookbookImage[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function fetchLookbook() {
      try {
        const res = await fetch('/api/lookbook')
        if (res.ok) {
          const data = await res.json()
          setImages(data)
        }
      } catch {
        // Silent fail — will use fallback images
      } finally {
        setLoading(false)
      }
    }
    fetchLookbook()
  }, [])

  if (!mounted || loading) {
    return <LoadingSkeleton />
  }

  return (
    <main className="bg-nv-black">
      {/* Section 1 — Enhanced Hero */}
      <LookbookHero />

      {/* Section 2 — Horizontal Scroll Gallery */}
      <HorizontalScrollGallery images={images} />

      {/* Section 3 — Magazine Grid */}
      <MagazineGrid images={images} />

      {/* Section 4 — Statement / Quote */}
      <StatementSection />
    </main>
  )
}
