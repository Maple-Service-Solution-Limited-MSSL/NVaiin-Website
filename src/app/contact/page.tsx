'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { toast } from 'sonner'
import { RevealSection } from '@/components/animations/RevealSection'
import { SplitTextReveal } from '@/components/animations/SplitTextReveal'

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setFormState('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      toast.success('Message sent successfully.')
    } catch {
      setFormState('error')
      toast.error('Something went wrong. Try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClasses =
    'w-full bg-nv-smoke border border-nv-smoke text-nv-white font-mono-brand text-sm px-4 py-3 placeholder:text-nv-fog focus:border-nv-gold focus:outline-none transition-colors duration-200'
  const labelClasses = 'font-bebas tracking-wider text-nv-fog text-sm uppercase block mb-2'

  const socialLinks = [
    {
      href: 'https://instagram.com/nvaiin',
      label: 'Instagram',
      icon: 'instagram',
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

  return (
    <div className="min-h-screen bg-nv-black px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Decorative gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-[2px] bg-gradient-to-r from-nv-gold to-nv-gold/30 mb-8"
        />

        {/* Heading */}
        <SplitTextReveal
          text="REACH OUT"
          as="h1"
          className="font-anton text-5xl md:text-7xl uppercase tracking-tight mb-16"
          animation="chars"
          trigger="onMount"
          stagger={0.06}
          duration={0.6}
        />

        {/* Contact Form Card */}
        <RevealSection direction="up" delay={0.3}>
          <div className="bg-nv-concrete border border-nv-smoke p-6 sm:p-8">
            {/* Gold accent line at top of card */}
            <div className="h-[2px] bg-gradient-to-r from-nv-gold via-nv-gold/60 to-transparent mb-6 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)]" />

            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-16 gap-6"
                >
                  <motion.p
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="font-anton text-nv-gold text-2xl uppercase tracking-wider"
                  >
                    MESSAGE RECEIVED.
                  </motion.p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="text-nv-fog font-mono-brand text-sm hover:text-nv-gold transition-colors duration-200 uppercase tracking-wider mt-4 cursor-hover"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClasses}>
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {formState === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-nv-red font-mono-brand text-sm"
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-nv-gold text-nv-black font-anton tracking-wider text-base py-4 hover:bg-nv-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-hover"
                  >
                    {formState === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </RevealSection>

        {/* Social Links */}
        <RevealSection direction="up" delay={0.4} className="mt-24 text-center">
          <h2 className="font-anton text-2xl md:text-3xl uppercase tracking-tight mb-3">
            FOLLOW THE MOVEMENT
          </h2>
          <p className="font-mono-brand text-nv-fog text-sm mb-8">
            Stay connected across platforms
          </p>
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://instagram.com/nvaiin"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-16 h-16 flex items-center justify-center bg-nv-smoke border border-nv-smoke text-nv-white hover:bg-nv-gold hover:text-nv-black hover:border-nv-gold transition-all duration-300 cursor-hover"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://x.com/nvaiin"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-16 h-16 flex items-center justify-center bg-nv-smoke border border-nv-smoke text-nv-white hover:bg-nv-gold hover:text-nv-black hover:border-nv-gold transition-all duration-300 cursor-hover font-anton text-lg"
              aria-label="X (Twitter)"
            >
              <span className="transition-transform duration-300 group-hover:scale-110">X</span>
            </a>
            <a
              href="https://tiktok.com/@nvaiin"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-16 h-16 flex items-center justify-center bg-nv-smoke border border-nv-smoke text-nv-white hover:bg-nv-gold hover:text-nv-black hover:border-nv-gold transition-all duration-300 cursor-hover"
              aria-label="TikTok"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.27 8.27 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.13z" />
              </svg>
            </a>
          </div>
        </RevealSection>

        {/* Footer Note */}
        <RevealSection direction="up" delay={0.5}>
          <p className="text-center font-mono-brand text-nv-fog text-sm mt-12">
            contact@nvaiin.com
          </p>
        </RevealSection>
      </div>
    </div>
  )
}
