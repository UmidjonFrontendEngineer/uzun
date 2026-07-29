'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSaralanganStore } from '@/store/useSaralanganStore';
import { useThemeStore } from '@/store/useThemeStore';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const dictionaries = {
  uz: {
    title: "Saralanganlar",
    itemsCount: "ta mahsulot",
    loading: "Yuklanmoqda...",
    emptyTitle: "Saralanganlar ro'yxati bo'sh",
    emptyDesc: "Mahsulotlardagi yurakcha tugmasini bosib o'zingizga yoqqan narsalarni bu yerga qo'shishingiz mumkin.",
    goShopping: "Xarid qilishni boshlash",
  },
  ru: {
    title: "Избранное",
    itemsCount: "товаров",
    loading: "Загрузка...",
    emptyTitle: "Список избранного пуст",
    emptyDesc: "Нажимайте на сердечко на карточках товаров, чтобы добавлять их в избранное.",
    goShopping: "Начать покупки",
  },
  en: {
    title: "Wishlist",
    itemsCount: "items",
    loading: "Loading...",
    emptyTitle: "Your wishlist is empty",
    emptyDesc: "Click the heart icon on products to save items you love right here.",
    goShopping: "Start Shopping",
  },
};

export default function WishlistPage() {
  const params = useParams();
  const locale = (params?.locale as keyof typeof dictionaries) || 'uz';
  const t = dictionaries[locale] || dictionaries.uz;

  const { theme } = useThemeStore();
  const { saralanganIds } = useSaralanganStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!mounted) return null;

  const wishlistProducts = products.filter((product) =>
    Array.isArray(saralanganIds) && saralanganIds.includes(product.id)
  );

  if (loading) {
    return (
      <div className={`min-h-[70vh] flex flex-col items-center justify-center gap-4 text-sm font-bold transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-400' : 'bg-gray-50/50 text-gray-500'}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full shadow-lg"
        />
        <span>{t.loading}</span>
      </div>
    );
  }

  return (
    <main className={`min-h-screen py-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-gray-50/50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{t.title}</h1>
            <motion.span 
              key={wishlistProducts.length}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 shadow-sm"
            >
              {wishlistProducts.length} {t.itemsCount}
            </motion.span>
          </div>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl border p-12 text-center flex flex-col items-center justify-center space-y-5 transition-all ${
              theme === 'dark' 
                ? 'bg-zinc-900/60 border-zinc-800 shadow-2xl shadow-purple-950/20' 
                : 'bg-white border-gray-200/60 shadow-xl shadow-gray-200/40'
            }`}
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-20 h-20 rounded-3xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xl shadow-purple-500/10"
            >
              <Heart size={36} className="fill-purple-200 dark:fill-purple-950" />
            </motion.div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-xl font-black tracking-tight">{t.emptyTitle}</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">{t.emptyDesc}</p>
            </div>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 text-white font-extrabold text-sm hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-600/30"
            >
              <ArrowLeft size={16} />
              <span>{t.goShopping}</span>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {wishlistProducts.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={{
                      id: item.id,
                      title: item.title || '',
                      price: typeof item.price === 'number' ? Math.round(item.price * 12500) : 0,
                      imageUrl: item.image || '',
                      rating: item.rating?.rate || 4.5,
                    }}
                    locale={locale}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </main>
  );
}