'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Heart, ShoppingBag, Star, Check, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useSaralanganStore } from '@/store/useSaralanganStore';
import { useThemeStore } from '@/store/useThemeStore';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

const dictionaries = {
    uz: {
        loading: "Yuklanmoqda...",
        reviews: "sharh",
        orders: "buyurtma",
        installment: "Muddatli to'lov",
        month: "oy",
        oneClickBuy: "1 Klikda Xarid Qilish",
        addToCart: "Savatga qo'shish",
        inCart: "Savatda",
        canBuy: "dona xarid qilish mumkin",
        boughtThisWeek: "Bu haftada kishi sotib oldi",
        description: "Mahsulot tavsifi",
        som: "so'm",
    },
    ru: {
        loading: "Загрузка...",
        reviews: "отзывов",
        orders: "заказов",
        installment: "Рассрочка",
        month: "мес",
        oneClickBuy: "Купить в 1 клик",
        addToCart: "Добавить в корзину",
        inCart: "В корзине",
        canBuy: "шт. доступно для покупки",
        boughtThisWeek: "купили на этой неделе",
        description: "Описание товара",
        som: "сум",
    },
    en: {
        loading: "Loading...",
        reviews: "reviews",
        orders: "orders",
        installment: "Installment",
        month: "mo",
        oneClickBuy: "Buy in 1 Click",
        addToCart: "Add to Cart",
        inCart: "In Cart",
        canBuy: "items available to buy",
        boughtThisWeek: "bought this week",
        description: "Product Description",
        som: "UZS",
    },
};

export default function ProductDetailPage() {
    const params = useParams();
    const locale = (params?.locale as keyof typeof dictionaries) || 'uz';
    const id = params?.id;
    const t = dictionaries[locale] || dictionaries.uz;

    const { theme } = useThemeStore();
    const { cart, toggleCart, incrementQuantity, decrementQuantity } = useCartStore();
    const { saralanganIds, toggleSaralangan } = useSaralanganStore();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedInstallment, setSelectedInstallment] = useState<number>(3);

    useEffect(() => {
        if (!id) return;
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.image);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className={`min-h-[70vh] flex flex-col items-center justify-center gap-4 text-sm font-bold transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-400' : 'bg-gray-50 text-black'}`}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full shadow-lg"
                />
                <span>{t.loading}</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-lg font-bold">
                Mahsulot topilmadi
            </div>
        );
    }

    const numericId = Number(product.id);
    const isSaralangan = Array.isArray(saralanganIds) && saralanganIds.includes(numericId);
    const cartItem = cart.find((item) => Number(item.id) === numericId);
    const quantity = cartItem ? cartItem.quantity : 0;

    const realPrice = Math.round(product.price * 12500);
    const formatPrice = (val: number) => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const monthlyPrice = Math.round((realPrice * 1.2) / selectedInstallment);

    // Namuna sifatida kichik rasmlar (FakeStore API bitta rasm bergani uchun o'sha rasmni takrorlaymiz)
    const images = [product.image, product.image, product.image, product.image];

    return (
        <main className={`min-h-screen py-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-gray-100 text-black'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">

                {/* Asosiy qism */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Chap tomon: Rasmlar galereyasi */}
                    <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`flex-1 rounded-3xl border p-8 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-gray-300 shadow-lg'
                                }`}
                        >
                            <button
                                onClick={() => toggleSaralangan(numericId)}
                                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-sm ${isSaralangan ? 'bg-red-50 text-red-500' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:text-red-500'
                                    }`}
                            >
                                <Heart size={20} className={isSaralangan ? 'fill-red-500 text-red-500' : ''} />
                            </button>

                            <img src={selectedImage} alt={product.title} className="max-h-[360px] object-contain drop-shadow-xl" />
                        </motion.div>
                    </div>

                    {/* O'rta va O'ng tomon: Ma'lumotlar va narx kartasi */}
                    <div className="lg:col-span-5 space-y-6">

                        <div className={`rounded-3xl border p-6 space-y-5 ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-gray-300 shadow-xl'
                            }`}>
                            <h1 className="text-lg sm:text-xl font-black text-black dark:text-zinc-100 leading-snug">
                                {product.title}
                            </h1>

                            {product.rating && (
                                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 dark:text-zinc-400">
                                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                                        <Star size={16} className="fill-amber-500" />
                                        <span>{product.rating.rate}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{product.rating.count} {t.reviews}</span>
                                    <span>•</span>
                                    <span>140+ {t.orders}</span>
                                </div>
                            )}

                            <hr className="border-gray-200 dark:border-zinc-800" />

                            {/* Narx va chegirma bloki */}
                            <div className="space-y-3">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-400">
                                        {formatPrice(realPrice)} {t.som}
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-zinc-500 line-through">
                                        {formatPrice(Math.round(realPrice * 1.25))} {t.som}
                                    </span>
                                </div>

                                {/* Muddatli to'lov tanlovi */}
                                <div className="space-y-2 pt-2">
                                    <span className="text-xs font-bold text-gray-700 dark:text-zinc-400">{t.installment}</span>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[24, 12, 6, 3].map((months) => (
                                            <button
                                                key={months}
                                                onClick={() => setSelectedInstallment(months)}
                                                className={`py-1.5 rounded-xl font-bold text-xs transition-all border ${selectedInstallment === months
                                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                                                    : 'border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-400 hover:border-gray-400'
                                                    }`}
                                            >
                                                {months} {t.month}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 font-bold text-xs flex items-center justify-between">
                                        <span>{formatPrice(monthlyPrice)} {t.som} × {selectedInstallment} {t.month}</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Sotib olish tugmalari */}
                            <div className="space-y-3 pt-2">
                                <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-black py-3 rounded-2xl transition-all text-sm shadow-md">
                                    {t.oneClickBuy}
                                </button>

                                {quantity === 0 ? (
                                    <button
                                        onClick={() => toggleCart(numericId)}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-2xl transition-all text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={16} />
                                        <span>{t.addToCart}</span>
                                    </button>
                                ) : (
                                    <div className={`flex items-center justify-between p-1.5 rounded-2xl border ${theme === 'dark' ? 'border-zinc-700 bg-zinc-800' : 'border-purple-300 bg-purple-50'
                                        }`}>
                                        <button
                                            onClick={() => decrementQuantity(numericId)}
                                            className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm font-bold text-black dark:text-white"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-sm font-black text-purple-700 dark:text-purple-300">
                                            {quantity} {t.inCart}
                                        </span>
                                        <button
                                            onClick={() => incrementQuantity(numericId)}
                                            className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm font-bold text-black dark:text-white"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Qo'shimcha ma'lumotlar */}
                            <div className="space-y-2 pt-2 text-xs font-bold text-gray-700 dark:text-zinc-400">
                                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                    <Check size={16} />
                                    <span>28 {t.canBuy}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-purple-600" />
                                    <span>5 {t.boughtThisWeek}</span>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Mahsulot tavsifi */}
                <div className={`rounded-3xl border p-6 sm:p-8 space-y-4 ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-gray-300 shadow-xl'
                    }`}>
                    <h2 className="text-lg font-black text-black dark:text-zinc-100">{t.description}</h2>
                    <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 leading-relaxed">
                        {product.description}
                    </p>
                </div>

            </div>
        </main>
    );
}