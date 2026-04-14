'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Instagram, ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LOGO_URL =
  'https://www.nvaiin.com/cdn/shop/files/Happy_N_Vaiin_23_x_19_in_11.png?v=1701494400'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/faqs', label: 'FAQs' },
]

const SOCIAL_LINKS = [
  {
    href: 'https://instagram.com/nvaiin',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://x.com/nvaiin',
    label: 'X',
    icon: 'x',
  },
  {
    href: 'https://tiktok.com/@nvaiin',
    label: 'TikTok',
    icon: 'tiktok',
  },
]

function TikTokIcon({ size = 16, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="fill-current"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.27 8.27 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.13z" />
    </svg>
  )
}

function XIcon({ size = 16, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function SocialIcon({ icon, size, strokeWidth }: { icon: string; size?: number; strokeWidth?: number }) {
  if (icon === 'x') return <XIcon size={size} strokeWidth={strokeWidth} />
  if (icon === 'tiktok') return <TikTokIcon size={size} strokeWidth={strokeWidth} />
  return null
}

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  const handleScroll = useCallback(() => {
    setShowBackToTop(window.scrollY > 600)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="bg-nv-concrete relative">
        {/* Gold gradient line at the top */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-nv-gold to-transparent" />

        {/* Back to top button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-nv-gold text-nv-black flex items-center justify-center hover:bg-nv-white transition-colors duration-200 cursor-hover shadow-lg shadow-nv-gold/20"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Grid */}
        <div className="px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1 — Brand */}
            <div className="flex flex-col gap-4">
              <img
                src={LOGO_URL}
                alt="N'VAIIN"
                height={45}
                width={55}
                className="h-[45px] w-auto object-contain"
              />
              <p className="font-bebas text-lg tracking-[0.2em] text-nv-gold">
                NOT MADE IN VAIN
              </p>
              <p className="font-syne text-sm text-nv-fog leading-relaxed max-w-xs">
                Revolutionary streetwear born from the belief that style should be
                a reflection of values. Conscious fashion. Timeless design.
              </p>
            </div>

            {/* Column 2 — Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bebas text-base tracking-[0.15em] text-nv-white">
                NAVIGATE
              </h3>
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-syne text-sm text-nv-fog hover:text-nv-gold transition-colors duration-300 cursor-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Social */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bebas text-base tracking-[0.15em] text-nv-white">
                CONNECT
              </h3>
              <ul className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon =
                    social.icon === 'x' || social.icon === 'tiktok' ? null : social.icon
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 font-syne text-sm text-nv-fog hover:text-nv-gold transition-colors duration-300 cursor-hover"
                      >
                        {Icon ? (
                          <Icon size={16} strokeWidth={1.5} />
                        ) : (
                          <SocialIcon
                            icon={social.icon}
                            size={16}
                            strokeWidth={1.5}
                          />
                        )}
                        {social.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Column 4 — Newsletter Preview */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bebas text-base tracking-[0.15em] text-nv-white">
                JOIN THE MOVEMENT
              </h3>
              <p className="font-syne text-sm text-nv-fog leading-relaxed max-w-xs">
                Subscribe for exclusive drops, early access, and behind-the-scenes
                content. Be the first to know.
              </p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-px flex-1 bg-nv-smoke" />
                <span className="font-mono-brand text-[10px] text-nv-gold tracking-[0.15em]">
                  COMING SOON
                </span>
                <div className="h-px flex-1 bg-nv-smoke" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nv-smoke px-4 sm:px-6 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            {/* Copyright */}
            <p className="font-mono-brand text-nv-fog tracking-wide">
              &copy; 2025 N&apos;VAIIN &mdash; All rights reserved
            </p>

            {/* Sacred Timestamp */}
            <p className="font-mono-brand text-nv-gold/70 tracking-[0.08em] text-[10px] sm:text-xs">
              02/22/2023 &mdash; 2:22PM
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 font-mono-brand text-nv-fog">
              <Link
                href="/privacy"
                className="hover:text-nv-gold transition-colors duration-300 cursor-hover"
              >
                Privacy Policy
              </Link>
              <Link
                href="/faqs"
                className="hover:text-nv-gold transition-colors duration-300 cursor-hover"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
