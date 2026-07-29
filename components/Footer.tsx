'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBag, ShieldCheck, Truck, Headphones, RefreshCcw } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

const locales = ['uz', 'ru', 'en'] as const;

export default function Footer() {
    const pathname = usePathname();
    const currentLocale = locales.find((loc) => pathname.startsWith(`/${loc}`)) || 'uz';
    const { theme } = useThemeStore();

    return (
        <footer className={`transition-colors duration-300 border-t ${theme === 'dark'
                ? 'bg-zinc-950 text-zinc-100 border-zinc-800/80'
                : 'bg-white text-gray-900 border-gray-200/80'
            }`}>
            {/* Yuqori qism: Afzalliklar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-inherit">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">Tezkor yetkazib berish</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">Buyurtmangiz 1 kundan boshlab yetkaziladi</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">Xavfsiz to'lov</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">Barcha turdagi to'lov usullari himoyalangan</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <RefreshCcw size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">Oson qaytarish</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">Mahsulot yoqmasa 10 kun ichida qaytaring</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <Headphones size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">24/7 Qo'llab-quvvatlash</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">Istalgan vaqtda savollaringizga javob oling</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Asosiy Footer havolalari */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-500/30">
                                U
                            </div>
                            <span className="text-lg font-extrabold tracking-tight">
                                Uzun Market
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                            O'zbekistondagi eng yirik onlayn marketpleks. Sevimli mahsulotlaringiz uydan chiqmagan holda.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold mb-4">Sahifalar</h4>
                        <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                            <li>
                                <Link href={`/${currentLocale}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    Bosh sahifa
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentLocale}/cart`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    Savat
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentLocale}/wishlist`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    Saralanganlar
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentLocale}/profile`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    Profil
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold mb-4">Yetkazib berish va Hamkorlik</h4>
                        <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                            <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">Punktlar ro'yxati</li>
                            <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">Sotuvchi bo'lish</li>
                            <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">Vakansiyalar</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold mb-4">Ilova uchun havolalar</h4>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 mb-4">
                            Mobil ilovamizni yuklab oling va xaridlarni yanada qulay davom ettiring.
                        </p>
                        <div className="flex gap-2">
                            <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs font-semibold cursor-pointer hover:border-purple-500 transition-colors">
                                App Store
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs font-semibold cursor-pointer hover:border-purple-500 transition-colors">
                                Google Play
                            </div>
                        </div>
                    </div>

                </div>

                {/* Pastki copyright qismi */}
                <div className="mt-12 pt-6 border-t border-inherit flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 dark:text-zinc-500 gap-4">
                    <p>© 2026 Uzun Market. Barcha huquqlar himoyalangan.</p>
                    <div className="flex gap-6">
                        <span className="hover:underline cursor-pointer">Maxfiylik siyosati</span>
                        <span className="hover:underline cursor-pointer">Foydalanish shartlari</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}