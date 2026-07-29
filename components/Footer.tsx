'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, ShieldCheck, RefreshCcw, Headphones } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

const locales = ['uz', 'ru', 'en'] as const;

export default function Footer() {
    const pathname = usePathname();
    const currentLocale = locales.find((loc) => pathname.startsWith(`/${loc}`)) || 'uz';
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    // Ko'p tilli tarjimalar lug'ati
    const t = {
        uz: {
            deliveryTitle: 'Tezkor yetkazib berish',
            deliveryDesc: "Buyurtmangiz 1 kundan boshlab yetkaziladi",
            paymentTitle: "Xavfsiz to'lov",
            paymentDesc: "Barcha turdagi to'lov usullari himoyalangan",
            returnTitle: 'Oson qaytarish',
            returnDesc: 'Mahsulot yoqmasa 10 kun ichida qaytaring',
            supportTitle: "24/7 Qo'llab-quvvatlash",
            supportDesc: 'Istalgan vaqtda savollaringizga javob oling',
            aboutDesc: "O'zbekistondagi eng yirik onlayn marketpleks. Sevimli mahsulotlaringiz uydan chiqmagan holda.",
            pages: 'Sahifalar',
            home: 'Bosh sahifa',
            cart: 'Savat',
            wishlist: 'Saralanganlar',
            profile: 'Profil',
            cooperation: 'Yetkazib berish va Hamkorlik',
            pickupPoints: "Punktlar ro'yxati",
            becomeSeller: "Sotuvchi bo'lish",
            vacancies: 'Vakansiyalar',
            appTitle: 'Ilova uchun havolalar',
            appDesc: 'Mobil ilovamizni yuklab oling va xaridlarni yanada qulay davom ettiring.',
            rights: 'Barcha huquqlar himoyalangan.',
            privacy: 'Maxfiylik siyosati',
            terms: 'Foydalanish shartlari',
        },
        ru: {
            deliveryTitle: 'Быстрая доставка',
            deliveryDesc: 'Доставка вашего заказа от 1 дня',
            paymentTitle: 'Безопасная оплата',
            paymentDesc: 'Все виды платежей защищены',
            returnTitle: 'Легкий возврат',
            returnDesc: 'Верните товар в течение 10 дней, если он не подошел',
            supportTitle: 'Поддержка 24/7',
            supportDesc: 'Получайте ответы на любые вопросы в любое время',
            aboutDesc: 'Крупнейший маркетплейс в Узбекистане. Ваши любимые товары не выходя из дома.',
            pages: 'Страницы',
            home: 'Главная',
            cart: 'Корзина',
            wishlist: 'Избранное',
            profile: 'Профиль',
            cooperation: 'Доставка и Сотрудничество',
            pickupPoints: 'Пункты выдачи',
            becomeSeller: 'Стать продавцом',
            vacancies: 'Вакансии',
            appTitle: 'Ссылки на приложение',
            appDesc: 'Загрузите наше мобильное приложение и продолжайте покупки с еще большим удобством.',
            rights: 'Все права защищены.',
            privacy: 'Политика конфиденциальности',
            terms: 'Условия использования',
        },
        en: {
            deliveryTitle: 'Fast Delivery',
            deliveryDesc: 'Your order delivered starting from 1 day',
            paymentTitle: 'Secure Payment',
            paymentDesc: 'All types of payment methods are protected',
            returnTitle: 'Easy Returns',
            returnDesc: 'Return products within 10 days if you are not satisfied',
            supportTitle: '24/7 Support',
            supportDesc: 'Get answers to your questions at any time',
            aboutDesc: 'The largest marketplace in Uzbekistan. Your favorite products without leaving home.',
            pages: 'Pages',
            home: 'Home',
            cart: 'Cart',
            wishlist: 'Wishlist',
            profile: 'Profile',
            cooperation: 'Delivery & Cooperation',
            pickupPoints: 'Pickup points',
            becomeSeller: 'Become a seller',
            vacancies: 'Vacancies',
            appTitle: 'App Links',
            appDesc: 'Download our mobile app and continue shopping with even greater convenience.',
            rights: 'All rights reserved.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Use',
        },
    }[currentLocale];

    return (
        <footer className={`transition-colors duration-300 border-t ${
            isDark ? 'bg-zinc-950 text-zinc-100 border-zinc-800/80' : 'bg-white text-gray-900 border-gray-200/80'
        }`}>
            {/* Yuqori qism: Afzalliklar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-inherit">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">{t.deliveryTitle}</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">{t.deliveryDesc}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">{t.paymentTitle}</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">{t.paymentDesc}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <RefreshCcw size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">{t.returnTitle}</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">{t.returnDesc}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                            <Headphones size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-1">{t.supportTitle}</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">{t.supportDesc}</p>
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
                            {t.aboutDesc}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold mb-4">{t.pages}</h4>
                        <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                            <li>
                                <Link href={`/${currentLocale}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    {t.home}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentLocale}/cart`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    {t.cart}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentLocale}/wishlist`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    {t.wishlist}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentLocale}/profile`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    {t.profile}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold mb-4">{t.cooperation}</h4>
                        <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                            <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">{t.pickupPoints}</li>
                            <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">{t.becomeSeller}</li>
                            <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">{t.vacancies}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold mb-4">{t.appTitle}</h4>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 mb-4">
                            {t.appDesc}
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
                    <p>© 2026 Uzun Market. {t.rights}</p>
                    <div className="flex gap-6">
                        <span className="hover:underline cursor-pointer">{t.privacy}</span>
                        <span className="hover:underline cursor-pointer">{t.terms}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}