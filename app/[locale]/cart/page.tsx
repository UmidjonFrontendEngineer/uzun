'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useThemeStore } from '@/store/useThemeStore';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const dictionaries = {
  uz: {
    title: "Savat",
    itemsCount: "ta mahsulot",
    loading: "Yuklanmoqda...",
    emptyTitle: "Savatingiz hozircha bo'sh",
    emptyDesc: "Bosh sahifaga o'ting va o'zingizga yoqqan mahsulotlarni savatga qo'shing.",
    goShopping: "Xarid qilishni boshlash",
    delivery: "Yetkazib berish:",
    free: "Bepul",
    deliveryTime: "1 kunda",
    orderInfo: "Buyurtma ma'lumotlari",
    productsTotal: "Mahsulotlar",
    totalPayment: "Jami to'lov:",
    checkout: "Rasmiylashtirishga o'tish",
    som: "so'm",
  },
  ru: {
    title: "Корзина",
    itemsCount: "товаров",
    loading: "Загрузка...",
    emptyTitle: "Ваша корзина пока пуста",
    emptyDesc: "Перейдите на главную страницу и добавьте понравившиеся товары в корзину.",
    goShopping: "Начать покупки",
    delivery: "Доставка:",
    free: "Бесплатно",
    deliveryTime: "За 1 день",
    orderInfo: "Детали заказа",
    productsTotal: "Товары",
    totalPayment: "Итого к оплате:",
    checkout: "Перейти к оформлению",
    som: "сум",
  },
  en: {
    title: "Cart",
    itemsCount: "items",
    loading: "Loading...",
    emptyTitle: "Your cart is empty",
    emptyDesc: "Go to the home page and add your favorite products to the cart.",
    goShopping: "Start Shopping",
    delivery: "Delivery:",
    free: "Free",
    deliveryTime: "In 1 day",
    orderInfo: "Order Summary",
    productsTotal: "Products",
    totalPayment: "Total payment:",
    checkout: "Proceed to Checkout",
    som: "UZS",
  },
};

export default function CartPage() {
  const params = useParams();
  const locale = (params?.locale as keyof typeof dictionaries) || 'uz';
  const t = dictionaries[locale] || dictionaries.uz;

  const { theme } = useThemeStore();
  const { cart, incrementQuantity, decrementQuantity, toggleCart } = useCartStore();
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

  const formatPrice = (val?: any) => {
    const num = Number(val);
    if (isNaN(num)) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const cartDetailedItems = cart.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return {
      ...product,
      quantity: cartItem.quantity,
      realPrice: product && typeof product.price === 'number' ? Math.round(product.price * 12500) : 0,
    };
  }).filter(item => item.title !== undefined);

  const totalPrice = cartDetailedItems.reduce(
    (sum, item) => sum + item.realPrice * item.quantity,
    0
  );

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className={`min-h-[70vh] flex flex-col items-center justify-center gap-4 text-sm font-bold transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-400' : 'bg-gray-50 text-gray-900'}`}>
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
    <main className={`min-h-screen py-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${theme === 'dark'
            ? 'text-zinc-100'
            : 'text-black'
            }`}>{t.title}</h1>
        </motion.div>

        {cartDetailedItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl border p-12 text-center flex flex-col items-center justify-center space-y-5 transition-all ${theme === 'dark'
              ? 'bg-zinc-900/80 border-zinc-800 shadow-2xl shadow-purple-950/20'
              : 'bg-white border-gray-300 shadow-xl shadow-gray-300/40'
              }`}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-20 h-20 rounded-3xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xl shadow-purple-500/10"
            >
              <ShoppingBag size={36} className="fill-purple-200 dark:fill-purple-950" />
            </motion.div>
            <div className="space-y-2 max-w-sm">
              <h2 className={`text-xl font-black tracking-tight ${theme === 'dark'
                ? 'text-zinc-100'
                : 'text-black'
                }`}>{t.emptyTitle}</h2>
              <p className="text-sm font-medium text-gray-800 dark:text-zinc-400">{t.emptyDesc}</p>
            </div>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 text-white font-extrabold text-sm hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-600/30"
            >
              <span>{t.goShopping}</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Mahsulotlar ro'yxati */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl border p-5 sm:p-6 space-y-6 transition-all ${theme === 'dark'
                  ? 'bg-zinc-900/80 border-zinc-800 shadow-lg'
                  : 'bg-white border-gray-300 shadow-xl shadow-gray-200/50'
                  }`}
              >
                <div className="flex items-center justify-between border-b border-gray-300 dark:border-zinc-800 pb-4">
                  <span className={`text-sm font-bold ${theme === 'dark'
                    ? 'text-zinc-100'
                    : 'text-black'
                    }`}>
                    Jami: <strong className={`${theme === 'dark'
                      ? 'text-zinc-100'
                      : 'text-black'
                      }`}>{totalItemsCount} {t.itemsCount}</strong>
                  </span>
                </div>

                <div className="divide-y divide-gray-300 dark:divide-zinc-800">
                  <AnimatePresence>
                    {cartDetailedItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        layout
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 shrink-0 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className={`text-sm font-black ${theme === 'dark'
                              ? 'text-zinc-100'
                              : 'text-black'
                              } line-clamp-2 max-w-xs mb-1`}>
                              {item.title}
                            </h3>
                            <span className="text-xs font-semibold text-gray-700 dark:text-zinc-400">{t.delivery} {t.deliveryTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto gap-5">
                          {/* Miqdorni o'zgartirish (+ / -) */}
                          <div className={`flex items-center border rounded-2xl overflow-hidden shadow-sm ${theme === 'dark' ? 'border-zinc-700 bg-zinc-800 text-zinc-100' : 'border-gray-400 bg-white text-black font-bold'
                            }`}>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => decrementQuantity(item.id)}
                              className="p-2.5 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                            >
                              <Minus size={14} />
                            </motion.button>
                            <span className="px-3 text-sm font-black">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => incrementQuantity(item.id)}
                              className="p-2.5 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>

                          {/* Narx */}
                          <div className="text-right min-w-[90px]">
                            <span className="text-base font-black text-purple-700 dark:text-purple-400 block">
                              {formatPrice(item.realPrice * item.quantity)} {t.som}
                            </span>
                          </div>

                          {/* O'chirish */}
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => toggleCart(item.id)}
                            className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Buyurtma tafsilotlari qismi */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`rounded-3xl border p-6 space-y-6 sticky top-24 transition-all ${theme === 'dark'
                  ? 'bg-zinc-900/80 border-zinc-800 shadow-lg'
                  : 'bg-white border-gray-300 shadow-xl shadow-gray-200/50'
                  }`}
              >
                <h3 className={`text-lg font-black ${theme === 'dark'
                  ? 'text-zinc-100'
                  : 'text-black'
                  }`}>{t.orderInfo}</h3>

                <div className="space-y-3 text-sm text-gray-900 dark:text-zinc-400">
                  <div className="flex justify-between font-bold">
                    <span>{t.productsTotal} ({totalItemsCount}):</span>
                    <span className="font-extrabold text-black dark:text-zinc-200">{formatPrice(totalPrice)} {t.som}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>{t.delivery}</span>
                    <span className="text-green-700 dark:text-green-400 font-black">{t.free}</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 dark:border-zinc-800 pt-4 flex justify-between items-center">
                  <span className={`text-base font-black ${theme === 'dark'
                    ? 'text-zinc-100'
                    : 'text-black'
                    }`}>{t.totalPayment}</span>
                  <span className="text-xl font-black text-purple-700 dark:text-purple-400">
                    {formatPrice(totalPrice)} {t.som}
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-600/30"
                >
                  <span>{t.checkout}</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}