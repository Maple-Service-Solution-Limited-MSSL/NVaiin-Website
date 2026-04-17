'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const router = useRouter()
  
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const subtotal = totalPrice()
  const total = subtotal + (subtotal >= 75 ? 0 : 9.99)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName || !email || items.length === 0) return

    setLoading(true)
    try {
      const formattedItems = items.map(item => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        qty: item.qty,
        price: item.price
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          items: formattedItems
        })
      })

      if (res.ok) {
        setSuccess(true)
        clearCart()
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('An expected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-nv-black flex flex-col items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <CheckCircle className="w-16 h-16 text-nv-gold mx-auto mb-6" />
          <h1 className="font-anton text-5xl md:text-6xl uppercase tracking-tight mb-4">
            ORDER SECURED
          </h1>
          <p className="font-mono-brand text-nv-fog text-sm max-w-md mx-auto mb-8">
            Thank you for your purchase. We've received your order and will process it shortly.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-nv-gold text-nv-black font-anton tracking-wider px-8 py-4 hover:bg-nv-white transition-colors duration-200"
          >
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-nv-black flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-nv-smoke mx-auto mb-6" />
          <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-tight mb-4">
            YOUR BAG IS EMPTY.
          </h1>
          <Link href="/shop" className="inline-block mt-4 text-nv-gold uppercase font-mono-brand">
            ← Back to shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nv-black px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Checkout Form */}
        <div>
          <h1 className="font-anton text-4xl uppercase tracking-tight mb-8">SECURE CHECKOUT</h1>
          <form onSubmit={handleCheckout} className="space-y-6">
            <div>
              <label className="block font-bebas text-lg tracking-wider text-nv-fog mb-2">FULL NAME</label>
              <input
                type="text"
                required
                className="w-full bg-nv-concrete border border-nv-smoke text-nv-white font-mono-brand px-4 py-3 focus:outline-none focus:border-nv-gold transition-colors"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-bebas text-lg tracking-wider text-nv-fog mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                className="w-full bg-nv-concrete border border-nv-smoke text-nv-white font-mono-brand px-4 py-3 focus:outline-none focus:border-nv-gold transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-anton text-xl uppercase py-5 transition-all duration-200 mt-4 ${
                loading ? 'bg-nv-smoke text-nv-fog cursor-not-allowed' : 'bg-nv-gold text-nv-black hover:bg-nv-white'
              }`}
            >
              {loading ? 'PROCESSING...' : 'COMPLETE PURCHASE'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-nv-concrete border border-nv-smoke p-6 h-fit">
          <h2 className="font-bebas text-2xl tracking-wider mb-6 pb-4 border-b border-nv-smoke">ORDER SUMMARY</h2>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border border-nv-smoke" />}
                  <div>
                    <p className="font-mono-brand text-nv-white text-sm truncate max-w-[200px]">{item.name}</p>
                    <p className="font-mono-brand text-nv-fog text-xs border rounded w-fit px-1">{item.size}</p>
                  </div>
                </div>
                <p className="font-mono-brand text-sm">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-nv-smoke space-y-3 font-mono-brand text-sm">
            <div className="flex justify-between">
              <span className="text-nv-fog">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-nv-fog">Shipping</span>
              <span className={subtotal >= 75 ? 'text-nv-gold' : 'text-nv-fog'}>
                {subtotal >= 75 ? 'FREE' : '$9.99'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-nv-smoke flex justify-between items-center">
            <span className="font-anton text-xl uppercase">Total</span>
            <span className="font-anton text-2xl text-nv-gold">${total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
