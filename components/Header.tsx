'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Sun, Moon, Globe, User, Search } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useSaralanganStore } from '@/store/useSaralanganStore';
import { useThemeStore } from '@/store/useThemeStore';

const locales = ['uz', 'ru', 'en'] as const;

// Header uchun tillar lug'ati
const dictionaries = {
    uz: {
        brand: "Uzun Market",
        home: "Bosh sahifa",
        wishlist: "Saralanganlar",
        cart: "Savat",
        searchPlaceholder: "Mahsulotlar va turkumlar bo'yicha qidirish...",
    },
    ru: {
        brand: "Uzun Market",
        home: "Главная",
        wishlist: "Избранное",
        cart: "Корзина",
        searchPlaceholder: "Поиск товаров и категорий...",
    },
    en: {
        brand: "Uzun Market",
        home: "Home",
        wishlist: "Wishlist",
        cart: "Cart",
        searchPlaceholder: "Search products and categories...",
    },
};

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const currentLocale = locales.find((loc) => pathname.startsWith(`/${loc}`)) || 'uz';
    const t = dictionaries[currentLocale] || dictionaries.uz;

    const { cart } = useCartStore();
    const { saralanganIds } = useSaralanganStore();
    const { theme, setTheme } = useThemeStore();

    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setMounted(true);
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalWishlistCount = saralanganIds.length;

    const handleLocaleChange = (newLocale: string) => {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
        const newPath = pathname.replace(/^\/(uz|ru|en)/, `/${newLocale}`);
        router.push(newPath);
    };

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        const root = document.documentElement;
        if (nextTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    if (!mounted) return null;

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-zinc-950/70 border-b border-gray-200/60 dark:border-zinc-800/60 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">

                {/* 1. Logo */}
                <Link
                    href={`/${currentLocale}`}
                    className="flex items-center gap-2.5 group shrink-0"
                >
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                        U
                    </div>
                    <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent hidden sm:inline-block">
                        {t.brand}
                    </span>
                </Link>

                {/* 2. O'rta qism: Navigatsiya havolalari va Qidiruv */}
                <div className="hidden lg:flex items-center gap-1 bg-gray-100/80 dark:bg-zinc-900/80 p-1.5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/50 shadow-inner shrink-0">
                    <Link
                        href={`/${currentLocale}`}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-200"
                    >
                        {t.home}
                    </Link>
                    <Link
                        href={`/${currentLocale}/wishlist`}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-200"
                    >
                        {t.wishlist}
                    </Link>
                    <Link
                        href={`/${currentLocale}/cart`}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-200"
                    >
                        {t.cart}
                    </Link>
                </div>

                {/* Qidiruv paneli */}
                <div className="flex-1 max-w-md mx-2">
                    <div className="relative flex items-center">
                        <Search size={18} className="absolute left-4 text-gray-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.searchPlaceholder}
                            className="w-full bg-gray-100/80 dark:bg-zinc-900/80 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl border border-gray-200/60 dark:border-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-500/40 transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* 3. O'ng qism: Tillar, Theme, Wishlist, Cart va Profile */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                    {/* Tillar switcher */}
                    <div className="relative flex items-center bg-gray-100/80 dark:bg-zinc-900/80 p-1 rounded-xl border border-gray-200/60 dark:border-zinc-800">
                        <Globe size={14} className="ml-2 text-gray-400 dark:text-zinc-500" />
                        <select
                            value={currentLocale}
                            onChange={(e) => handleLocaleChange(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-800 dark:text-zinc-200 px-2 py-1.5 outline-none cursor-pointer uppercase"
                        >
                            <option value="uz" className="bg-white dark:bg-zinc-900">UZ</option>
                            <option value="ru" className="bg-white dark:bg-zinc-900">RU</option>
                            <option value="en" className="bg-white dark:bg-zinc-900">EN</option>
                        </select>
                    </div>

                    {/* Dark / Light mode tugmasi */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Theme toggle"
                        className="p-2.5 rounded-2xl bg-gray-100/80 dark:bg-zinc-900/80 text-gray-700 dark:text-zinc-300 hover:scale-105 active:scale-95 border border-gray-200/60 dark:border-zinc-800 transition-all duration-200 shadow-sm"
                    >
                        {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
                    </button>

                    {/* Saralanganlar iconi */}
                    <Link
                        href={`/${currentLocale}/wishlist`}
                        aria-label="Wishlist"
                        className="relative p-2.5 rounded-2xl bg-gray-100/80 dark:bg-zinc-900/80 text-gray-700 dark:text-zinc-300 hover:scale-105 active:scale-95 border border-gray-200/60 dark:border-zinc-800 transition-all duration-200 shadow-sm"
                    >
                        <Heart size={18} className={totalWishlistCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                        {totalWishlistCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                                {totalWishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Savat iconi */}
                    <Link
                        href={`/${currentLocale}/cart`}
                        aria-label="Cart"
                        className="relative p-2.5 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-purple-600/30"
                    >
                        <ShoppingBag size={18} />
                        {totalCartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                                {totalCartCount}
                            </span>
                        )}
                    </Link>

                    {/* Profil */}
                    <Link
                        href={`/${currentLocale}/profile`}
                        aria-label="Profile"
                        className="hidden sm:flex p-2.5 rounded-2xl bg-gray-100/80 dark:bg-zinc-900/80 text-gray-700 dark:text-zinc-300 hover:scale-105 active:scale-95 border border-gray-200/60 dark:border-zinc-800 transition-all duration-200 shadow-sm"
                    >
                        <User size={18} />
                    </Link>

                </div>

            </div>
        </header>
    );
}