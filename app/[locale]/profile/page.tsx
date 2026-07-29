'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Package,
    Heart,
    MapPin,
    LogOut,
    ChevronRight,
} from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore'; // Theme storeni ulaymiz

interface ProfilePageProps {
    locale: string;
}

export default function ProfilePage({ locale }: ProfilePageProps) {
    const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'settings'>('orders');
    
    // Global theme store'dan holatni olamiz
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    // Tarjimalar
    const t = {
        title: locale === 'uz' ? 'Shaxsiy kabinet' : locale === 'ru' ? 'Личный кабинет' : 'Personal Cabinet',
        orders: locale === 'uz' ? 'Buyurtmalarim' : locale === 'ru' ? 'Мои заказы' : 'My Orders',
        wishlist: locale === 'uz' ? 'Saralanganlar' : locale === 'ru' ? 'Избранное' : 'Wishlist',
        addresses: locale === 'uz' ? 'Yetkazib berish manzillari' : locale === 'ru' ? 'Адреса доставки' : 'Delivery Addresses',
        settings: locale === 'uz' ? 'Sozlamalar' : locale === 'ru' ? 'Настройки' : 'Settings',
        logout: locale === 'uz' ? 'Chiqish' : locale === 'ru' ? 'Выйти' : 'Log out',
        orderHistory: locale === 'uz' ? 'Buyurtmalar tarixi' : locale === 'ru' ? 'История заказов' : 'Order History',
        statusDelivered: locale === 'uz' ? 'Yetkazib berildi' : locale === 'ru' ? 'Доставлено' : 'Delivered',
        statusOnTheWay: locale === 'uz' ? 'Yetkazilmoqda' : locale === 'ru' ? 'В пути' : 'On the way',
        details: locale === 'uz' ? 'Batafsil' : locale === 'ru' ? 'Подробнее' : 'Details',
        emptyWishlist: locale === 'uz' ? "Hozircha saralangan mahsulotlar yo'q. Yurakcha tugmasini bosing!" : locale === 'ru' ? 'В избранном пока пусто. Нажмите на сердечко!' : 'No wishlist items yet.',
        mainAddress: locale === 'uz' ? "(Asosiy manzil)" : locale === 'ru' ? '(Основной адрес)' : '(Main address)',
        selected: locale === 'uz' ? 'Tanlangan' : locale === 'ru' ? 'Выбрано' : 'Selected',
        addAddress: locale === 'uz' ? "+ Yangi manzil qo'shish" : locale === 'ru' ? '+ Добавить новый адрес' : '+ Add new address',
        personalInfo: locale === 'uz' ? "Shaxsiy ma'lumotlar" : locale === 'ru' ? 'Личные данные' : 'Personal Information',
        nameLabel: locale === 'uz' ? 'Ism' : locale === 'ru' ? 'Имя' : 'Name',
        phoneLabel: locale === 'uz' ? 'Telefon raqam' : locale === 'ru' ? 'Номер телефона' : 'Phone number',
        emailLabel: locale === 'uz' ? 'Elektron pochta' : locale === 'ru' ? 'Эл. почта' : 'Email',
        save: locale === 'uz' ? 'Saqlash' : locale === 'ru' ? 'Сохранить' : 'Save',
        itemsText: locale === 'uz' ? 'ta mahsulot' : locale === 'ru' ? 'тов.' : 'items',
    };

    const user = {
        name: 'uzun-admin',
        phone: '+998 90 300 10 10',
        email: 'uzun-admin@uzun.uz',
    };

    const orders = [
        {
            id: 'UZ-84920',
            date: '28 Iyul, 2026',
            status: t.statusDelivered,
            statusColor: isDark ? 'bg-green-950/50 text-green-400 border border-green-800' : 'bg-green-100 text-green-700',
            total: '1,250,000 so\'m',
            itemsCount: 2,
        },
        {
            id: 'UZ-83102',
            date: '15 Iyul, 2026',
            status: t.statusOnTheWay,
            statusColor: isDark ? 'bg-amber-950/50 text-amber-400 border border-amber-800' : 'bg-amber-100 text-amber-700',
            total: '450,000 so\'m',
            itemsCount: 1,
        },
    ];

    return (
        <motion.main
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`max-w-7xl mx-auto px-4 py-8 ${isDark ? 'text-zinc-100' : 'text-gray-950'} ${isDark ? 'bg-black border-black' : 'bg-white border-gray-100'}`}
        >
            <h1 className="text-2xl font-black mb-6">{t.title}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Chap tomon: Foydalanuvchi info va Menyu */}
                <div className="space-y-6">
                    {/* Profil karta */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition-colors ${
                            isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'
                        }`}
                    >
                        <div className="w-14 h-14 rounded-full bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-xl">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className={`font-bold ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{user.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">{user.phone}</p>
                        </div>
                    </motion.div>

                    {/* Navigatsiya menyusi */}
                    <div className={`rounded-2xl border shadow-sm overflow-hidden p-2 space-y-1 transition-colors ${
                        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'
                    }`}>
                        {[
                            { id: 'orders', label: t.orders, icon: Package },
                            { id: 'wishlist', label: t.wishlist, icon: Heart },
                            { id: 'addresses', label: t.addresses, icon: MapPin },
                            { id: 'settings', label: t.settings, icon: User },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <motion.button
                                    key={tab.id}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${
                                        isActive
                                            ? isDark ? 'bg-purple-950/40 text-purple-400 font-bold' : 'bg-purple-50 text-purple-700 font-bold'
                                            : isDark ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} />
                                        <span>{tab.label}</span>
                                    </div>
                                    <ChevronRight size={16} />
                                </motion.button>
                            );
                        })}

                        <div className={`pt-2 border-t mt-2 ${isDark ? 'border-zinc-800' : 'border-gray-100'}`}>
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>{t.logout}</span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* O'ng tomon: Tanlangan bo'lim kontenti */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                                    isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'
                                }`}
                            >
                                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{t.orderHistory}</h2>

                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className={`border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors ${
                                            isDark ? 'border-zinc-800 hover:border-purple-800/60 bg-zinc-900/50' : 'border-gray-100 hover:border-purple-200 bg-white'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`font-bold ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{order.id}</span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${order.statusColor}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-zinc-400">Sana: {order.date} • {order.itemsCount} {t.itemsText}</p>
                                        </div>

                                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <span className={`font-bold ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{order.total}</span>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                                    isDark
                                                        ? 'bg-purple-950/60 text-purple-300 hover:bg-purple-600 hover:text-white'
                                                        : 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white'
                                                }`}
                                            >
                                                {t.details}
                                            </motion.button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'wishlist' && (
                            <motion.div
                                key="wishlist"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className={`p-6 rounded-2xl border shadow-sm ${
                                    isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'
                                }`}
                            >
                                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{t.wishlist}</h2>
                                <p className="text-sm text-gray-500 dark:text-zinc-400 py-12 text-center">{t.emptyWishlist}</p>
                            </motion.div>
                        )}

                        {activeTab === 'addresses' && (
                            <motion.div
                                key="addresses"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                                    isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'
                                }`}
                            >
                                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{t.addresses}</h2>
                                <div className={`p-4 border rounded-xl flex justify-between items-center ${
                                    isDark ? 'border-purple-800/60 bg-purple-950/20' : 'border-purple-200 bg-purple-50/50'
                                }`}>
                                    <div>
                                        <p className={`text-sm font-bold ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>Toshkent shahri, Chilonzor tumani</p>
                                        <p className="text-xs text-gray-500 dark:text-zinc-400">Bunyodkor ko'chasi, 15-uy <span className="text-purple-600 dark:text-purple-400">{t.mainAddress}</span></p>
                                    </div>
                                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-2.5 py-1 rounded-lg">{t.selected}</span>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                                        isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                    }`}
                                >
                                    {t.addAddress}
                                </motion.button>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                                    isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'
                                }`}
                            >
                                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>{t.personalInfo}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-1">{t.nameLabel}</label>
                                        <input
                                            type="text"
                                            defaultValue={user.name}
                                            className={`w-full border rounded-xl p-2.5 text-sm outline-none transition-colors focus:border-purple-600 ${
                                                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-100' : 'bg-gray-50 border-gray-200 text-gray-900'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-1">{t.phoneLabel}</label>
                                        <input
                                            type="text"
                                            defaultValue={user.phone}
                                            className={`w-full border rounded-xl p-2.5 text-sm outline-none transition-colors focus:border-purple-600 ${
                                                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-100' : 'bg-gray-50 border-gray-200 text-gray-900'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-1">{t.emailLabel}</label>
                                        <input
                                            type="email"
                                            defaultValue={user.email}
                                            className={`w-full border rounded-xl p-2.5 text-sm outline-none transition-colors focus:border-purple-600 ${
                                                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-100' : 'bg-gray-50 border-gray-200 text-gray-900'
                                            }`}
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors mt-4 shadow-lg shadow-purple-600/20"
                                >
                                    {t.save}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.main>
    );
}