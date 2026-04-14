'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealSection } from '@/components/animations/RevealSection'
import { SplitTextReveal } from '@/components/animations/SplitTextReveal'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const values = [
  {
    title: 'CONSCIOUS',
    description:
      "Every thread is a choice. N'VAIIN is built on the foundation of conscious creation — from ethically sourced materials to sustainable production practices. We believe luxury and responsibility are not mutually exclusive. Each piece carries the weight of intention, designed for those who understand that what you wear speaks volumes about what you stand for.",
  },
  {
    title: 'TIMELESS',
    description:
      'Trends fade. Purpose endures. Our designs transcend seasonal cycles, embracing a philosophy of timeless aesthetics rooted in street culture. Each garment is crafted to age with character, becoming more personal with every wear. We create pieces that will remain relevant long after the hype dies — because true style has no expiration date.',
  },
  {
    title: 'PURPOSEFUL',
    description:
      "Born on 02/22/2023 at 2:22PM — a moment of divine alignment. N'VAIIN exists not merely to clothe, but to inspire. A portion of every sale supports community initiatives and creative empowerment programs. We build bridges between fashion and purpose, proving that a brand can be both commercially viable and deeply meaningful.",
  },
]

const milestones = [
  {
    date: '02/22/23',
    title: 'Brand Founded',
    description: 'N\'VAIIN is born at 2:22PM — a moment of divine alignment and purpose.',
  },
  {
    date: '03/2023',
    title: 'First Collection',
    description: 'The inaugural drop launches, setting the tone for conscious streetwear.',
  },
  {
    date: '06/2023',
    title: 'Community Launch',
    description: 'The N\'VAIIN community platform goes live — uniting like-minded individuals.',
  },
  {
    date: '09/2023',
    title: 'Global Reach',
    description: 'International shipping begins. The movement crosses borders.',
  },
  {
    date: '01/2024',
    title: 'Lookbook Vol. 01',
    description: 'The first editorial lookbook captures the brand vision in full.',
  },
  {
    date: '2025',
    title: 'The Movement Continues',
    description: 'New collections, new chapters. Not made in vain — ever.',
  },
]

function TimestampCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex items-center gap-3">
      {['0', '2', '/', '2', '2', '/', '2', '0', '2', '3', ' ', '—', ' ', '2', ':', '2', '2', 'P', 'M'].map(
        (char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: i * 0.04,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-mono-brand text-nv-gold text-sm md:text-base tracking-wider inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      )}
    </div>
  )
}

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex items-start gap-4 sm:gap-8"
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'sm:text-right sm:pr-4' : 'sm:text-left sm:pl-4 sm:order-2'}`}>
        <span className="font-mono-brand text-nv-gold text-xs tracking-[0.1em]">
          {milestone.date}
        </span>
        <h3 className="font-anton text-lg md:text-xl uppercase tracking-tight mt-1">
          {milestone.title}
        </h3>
        <p className="font-mono-brand text-sm text-nv-fog mt-2 leading-relaxed max-w-sm sm:ml-auto sm:mr-auto">
          {milestone.description}
        </p>
      </div>

      {/* Center dot + line */}
      <div className="hidden sm:flex flex-col items-center flex-shrink-0 order-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-3 h-3 rounded-full bg-nv-gold border-2 border-nv-gold ring-4 ring-nv-gold/20 z-10"
        />
        {index < milestones.length - 1 && (
          <div className="w-px h-full bg-nv-gold/20 absolute top-3 left-1/2 -translate-x-1/2" />
        )}
      </div>

      {/* Spacer for opposite side */}
      <div className={`hidden sm:block flex-1 ${isLeft ? 'sm:pl-4 sm:order-2' : 'sm:pr-4 sm:order-0'}`} />

      {/* Mobile dot */}
      <div className="sm:hidden absolute left-0 top-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-2.5 h-2.5 rounded-full bg-nv-gold z-10"
        />
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-nv-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <SplitTextReveal
          text="NOT MADE IN VAIN"
          as="h1"
          className="font-anton text-5xl md:text-7xl lg:text-9xl uppercase tracking-tight"
          animation="chars"
          trigger="onMount"
          stagger={0.025}
          duration={0.6}
        />

        <RevealSection direction="up" delay={0.6} className="mt-8">
          <TimestampCounter />
        </RevealSection>

        <RevealSection direction="up" delay={0.8}>
          <div className="w-32 h-px bg-nv-gold my-8 rotate-[-2deg]" />
        </RevealSection>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <RevealSection direction="up" delay={0}>
            <p className="font-mono-brand text-nv-fog text-sm md:text-base leading-relaxed">
              N&apos;VAIIN was born from a singular belief: that fashion should be a reflection
              of values, not just aesthetics. Founded on 02/22/2023 at exactly 2:22PM — a moment
              of divine alignment that would become the sacred timestamp of a movement — this brand
              emerged from the streets with a mission far greater than clothing.
            </p>
          </RevealSection>

          <RevealSection direction="up" delay={0.1}>
            <p className="font-mono-brand text-nv-fog text-sm md:text-base leading-relaxed">
              Every piece we create carries intention. From the selection of premium fabrics to the
              final stitch, N&apos;VAIIN represents the convergence of luxury streetwear and conscious
              design. We don&apos;t follow trends — we forge paths. We don&apos;t chase clout — we build
              legacy. Each garment is a statement that style and substance can coexist, that the
              clothes you wear can tell a story worth hearing.
            </p>
          </RevealSection>

          <RevealSection direction="up" delay={0.2}>
            <p className="font-mono-brand text-nv-fog text-sm md:text-base leading-relaxed">
              The name itself is a declaration: Not Made In Vain. Every drop is purposeful. Every
              collaboration is meaningful. Every community initiative we support reinforces our
              commitment to being more than a brand — we are a vessel for change, a platform for
              creative expression, and a beacon for those who refuse to settle for superficiality.
            </p>
          </RevealSection>

          <RevealSection direction="up" delay={0.3}>
            <p className="font-mono-brand text-nv-fog text-sm md:text-base leading-relaxed">
              We operate at the intersection of culture, consciousness, and craftsmanship. N&apos;VAIIN
              is for the architects of their own narrative — those who understand that true luxury
              is not about logos or price tags, but about the story behind what you wear and the
              values it represents. This is more than streetwear. This is a movement.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-20 text-center px-4">
        <RevealSection direction="clip" delay={0} className="mb-10">
          <div className="w-24 h-px bg-nv-gold mx-auto" />
        </RevealSection>

        <RevealSection direction="clip" delay={0.1}>
          <blockquote className="font-anton text-2xl md:text-4xl lg:text-5xl text-nv-gold leading-tight max-w-4xl mx-auto">
            &ldquo;N&apos;VAIIN is not merely a brand; it is a movement.&rdquo;
          </blockquote>
        </RevealSection>

        <RevealSection direction="clip" delay={0.2} className="mt-10">
          <div className="w-24 h-px bg-nv-gold mx-auto" />
        </RevealSection>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <RevealSection direction="up" className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="font-anton text-4xl md:text-5xl uppercase tracking-tight mb-4">
            THE JOURNEY
          </h2>
          <p className="font-mono-brand text-nv-gold text-sm tracking-wider">
            KEY MILESTONES
          </p>
        </RevealSection>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line (desktop) */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-nv-gold/20 -translate-x-1/2" />

          {/* Vertical line (mobile) */}
          <div className="sm:hidden absolute left-0 top-0 bottom-0 w-px bg-nv-gold/20" />

          <div className="flex flex-col gap-12 sm:gap-16 pl-6 sm:pl-0">
            {milestones.map((milestone, index) => (
              <TimelineItem key={milestone.date} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <RevealSection direction="up" className="mb-12 text-center">
            <h2 className="font-anton text-4xl md:text-5xl uppercase tracking-tight">
              OUR VALUES
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <RevealSection key={value.title} direction="up" delay={index * 0.1}>
                <div className="bg-nv-concrete border border-nv-smoke p-8 group hover:border-nv-gold transition-all duration-500 relative overflow-hidden h-full">
                  {/* Gold glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-nv-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-px bg-gradient-to-br from-nv-gold/20 via-transparent to-nv-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
                  <div className="relative">
                    <h3 className="font-anton text-2xl text-nv-white group-hover:text-nv-gold transition-colors duration-300">
                      {value.title}
                    </h3>
                    <div className="w-8 h-[2px] bg-nv-gold/30 group-hover:w-16 group-hover:bg-nv-gold transition-all duration-500 mt-4 mb-4" />
                    <p className="font-mono-brand text-sm text-nv-fog leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 text-center px-4">
        <RevealSection direction="up">
          <h2 className="font-anton text-3xl md:text-5xl uppercase tracking-tight mb-8">
            JOIN THE MOVEMENT
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-nv-gold text-nv-black font-anton text-2xl px-12 py-4 uppercase tracking-wider hover:bg-nv-white transition-colors duration-200 cursor-hover"
          >
            SHOP THE DROP
          </Link>
        </RevealSection>
      </section>
    </div>
  )
}
