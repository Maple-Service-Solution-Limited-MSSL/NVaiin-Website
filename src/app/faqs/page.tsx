'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { RevealSection } from '@/components/animations/RevealSection'
import { SplitTextReveal } from '@/components/animations/SplitTextReveal'

interface Faq {
  id: string
  question: string
  answer: string
  category: string
}

const CATEGORIES = ['ALL', 'ORDERS', 'SHIPPING', 'RETURNS', 'SIZING', 'BRAND'] as const
type Category = (typeof CATEGORIES)[number]

function normalizeCategory(cat: string): Category {
  const upper = cat.toUpperCase()
  if (CATEGORIES.includes(upper as Category)) return upper as Category
  return 'ALL'
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const [openId, setOpenId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch('/api/faqs')
        if (res.ok) {
          const data = await res.json()
          setFaqs(data)
        }
      } catch {
        // Silently fail - page shows empty
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'ALL') return faqs
    return faqs.filter((faq) => normalizeCategory(faq.category) === activeCategory)
  }, [faqs, activeCategory])

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="min-h-screen bg-nv-black px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Heading Section */}
        <RevealSection direction="up" className="mb-4">
          <SplitTextReveal
            text="FAQS"
            as="h1"
            className="font-anton text-5xl md:text-7xl uppercase tracking-tight"
            animation="chars"
            trigger="onMount"
            stagger={0.06}
            duration={0.7}
          />
        </RevealSection>

        {/* Gold line decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-24 h-[2px] bg-gradient-to-r from-nv-gold via-nv-gold/60 to-transparent mb-12"
        />

        {/* Category Tabs */}
        <RevealSection direction="up" delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenId(null)
                }}
                className={`font-bebas tracking-wider text-sm uppercase px-5 py-2.5 border transition-all duration-200 cursor-hover ${
                  activeCategory === cat
                    ? 'bg-nv-gold text-nv-black border-nv-gold'
                    : 'bg-transparent text-nv-fog border-nv-smoke hover:border-nv-gold hover:text-nv-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealSection>

        {/* FAQ List */}
        {loading ? (
          <div className="flex flex-col gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-16 bg-nv-concrete border-b border-nv-smoke animate-pulse"
              />
            ))}
          </div>
        ) : filteredFaqs.length === 0 ? (
          <RevealSection direction="up" delay={0.3}>
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-16 h-16 rounded-full border border-nv-smoke flex items-center justify-center">
                <span className="font-bebas text-nv-fog text-lg tracking-wider">?</span>
              </div>
              <p className="font-mono-brand text-nv-fog text-sm text-center">
                No FAQs found in this category.
              </p>
              <button
                onClick={() => setActiveCategory('ALL')}
                className="font-bebas tracking-wider text-sm uppercase text-nv-gold hover:text-nv-white transition-colors duration-200 cursor-hover"
              >
                View all FAQs →
              </button>
            </div>
          </RevealSection>
        ) : (
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`bg-nv-concrete border-b border-nv-smoke transition-all duration-300 ${
                      isOpen ? 'border-l-2 border-l-nv-gold' : 'border-l-2 border-l-transparent'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left group cursor-hover"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bebas text-lg tracking-wider pr-4 group-hover:text-nv-gold transition-colors duration-200">
                        {faq.question}
                      </span>
                      <span
                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border border-nv-smoke text-nv-fog group-hover:border-nv-gold group-hover:text-nv-gold transition-all duration-300 ${
                          isOpen
                            ? 'border-nv-gold text-nv-gold bg-nv-gold/10 rotate-180'
                            : ''
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <div className="h-px bg-nv-smoke/50 mb-4" />
                            <p className="font-mono-brand text-sm text-nv-fog leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom CTA */}
        <RevealSection direction="up" delay={0.4} className="mt-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-b border-nv-smoke">
            <div>
              <p className="font-anton text-xl md:text-2xl uppercase tracking-tight text-nv-white">
                Still have questions?
              </p>
              <p className="font-mono-brand text-sm text-nv-fog mt-1">
                We&apos;re here to help.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-nv-gold text-nv-black font-anton tracking-wider text-base px-8 py-3.5 uppercase hover:bg-nv-white transition-colors duration-200 cursor-hover group"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </RevealSection>
      </div>
    </div>
  )
}
