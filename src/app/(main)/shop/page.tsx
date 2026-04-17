'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/shop/ProductCard';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  sizes: string[];
  category: string;
  tags: string[];
  isLimited: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQty: number;
}

const FILTERS = ['ALL', 'T-SHIRTS', 'HOODIES', 'ACCESSORIES', 'LIMITED'] as const;
type Filter = (typeof FILTERS)[number];

function getCategoryFilter(filter: Filter): string | null {
  switch (filter) {
    case 'T-SHIRTS':
      return 't-shirts';
    case 'HOODIES':
      return 'hoodies';
    case 'ACCESSORIES':
      return 'accessories';
    case 'LIMITED':
      return null;
    default:
      return null;
  }
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'LIMITED') return product.isLimited;
    const cat = getCategoryFilter(activeFilter);
    if (cat) return product.category?.toLowerCase() === cat;
    return true;
  });

  return (
    <div className="min-h-screen bg-nv-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-8 px-4 sm:px-6 lg:px-10"
      >
        <h1 className="font-anton text-6xl md:text-8xl uppercase tracking-tight">
          THE DROP
        </h1>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="px-4 sm:px-6 lg:px-10 pb-8"
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-bebas tracking-wider text-sm uppercase px-5 py-2.5 border-b-2 transition-all duration-200 cursor-hover ${
                activeFilter === filter
                  ? 'text-nv-gold border-nv-gold'
                  : 'text-nv-fog border-transparent hover:text-nv-white hover:border-nv-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="px-4 sm:px-6 lg:px-10 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-nv-concrete animate-pulse"
              >
                <div className="aspect-[3/4] bg-nv-smoke" />
                <div className="px-4 pt-3 pb-4 space-y-2">
                  <div className="h-5 bg-nv-smoke w-3/4" />
                  <div className="h-4 bg-nv-smoke w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-anton text-2xl md:text-3xl uppercase tracking-tight mb-4">
              NO PIECES FOUND
            </p>
            <p className="font-mono-brand text-nv-fog text-sm">
              Check back soon for new drops.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
