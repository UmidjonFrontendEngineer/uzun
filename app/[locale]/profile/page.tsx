'use client';

import React, { useState } from 'react';
import {
    User,
    Package,
    Heart,
    MapPin,
    CreditCard,
    Bell,
    LogOut,
    ChevronRight,
    ShieldCheck,
    Phone,
    Mail
} from 'lucide-react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'settings'>('orders');

    // Namuna uchun ma'lumotlar
    const user = {
        name: 'Umidjon',
        phone: '+998 90 123 45 67',
        email: 'umidjon@uzun.uz',
        bonusCard: '9860 **** **** 1234',
    };

    const orders = [
        {
            id: 'UZ-84920',
            date: '28 Iyul, 2026',
            status: 'Yetkazib berildi',
            statusColor: 'bg-green-100 text-green-700',
            total: '1,250,000 so\'m',
            itemsCount: 2,
        },
        {
            id: 'UZ-83102',
            date: '15 Iyul, 2026',
            status: 'Yetkazilmoqda',
            statusColor: 'bg-amber-100 text-amber-700',
            total: '450,000 so\'m',
            itemsCount: 1,
        },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-950 mb-6">Shaxsiy kabinet</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Chap tomon: Foydalanuvchi info va Menyu */}
                <div className="space-y-6">
                    {/* Profil karta */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{user.name}</h3>
                            <p className="text-xs text-gray-500">{user.phone}</p>
                        </div>
                    </div>

                    {/* Navigatsiya menyusi */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2 space-y-1">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Package size={18} />
                                <span>Buyurtmalarim</span>
                            </div>
                            <ChevronRight size={16} />
                        </button>

                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'wishlist' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Heart size={18} />
                                <span>Saralanganlar</span>
                            </div>
                            <ChevronRight size={16} />
                        </button>

                        <button
                            onClick={() => setActiveTab('addresses')}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'addresses' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                <span>Yetkazib berish manzillari</span>
                            </div>
                            <ChevronRight size={16} />
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <User size={18} />
                                <span>Sozlamalar</span>
                            </div>
                            <ChevronRight size={16} />
                        </button>

                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                                <LogOut size={18} />
                                <span>Chiqish</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* O'ng tomon: Tanlangan bo'lim kontenti */}
                <div className="lg:col-span-3">
                    {activeTab === 'orders' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Buyurtmalar tarixi</h2>

                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-purple-200 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-900">{order.id}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${order.statusColor}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">Sana: {order.date} • {order.itemsCount} ta mahsulot</p>
                                    </div>

                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                        <span className="font-bold text-gray-900">{order.total}</span>
                                        <button className="bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 px-4 py-2 rounded-xl text-xs font-semibold transition-all">
                                            Batafsil
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'wishlist' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Saralangan mahsulotlar</h2>
                            <p className="text-sm text-gray-500 py-12 text-center">Hozircha saralangan mahsulotlar yo'q. Yurakcha tugmasini bosing!</p>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Yetkazib berish manzillari</h2>
                            <div className="p-4 border border-purple-200 bg-purple-50/50 rounded-xl flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Toshkent shahri, Chilonzor tumani</p>
                                    <p className="text-xs text-gray-500">Bunyodkor ko'chasi, 15-uy (Asosiy manzil)</p>
                                </div>
                                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-lg">Tanlangan</span>
                            </div>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors">
                                + Yangi manzil qo'shish
                            </button>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Shaxsiy ma'lumotlar</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Ism</label>
                                    <input
                                        type="text"
                                        defaultValue={user.name}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-purple-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Telefon raqam</label>
                                    <input
                                        type="text"
                                        defaultValue={user.phone}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-purple-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Elektron pochta</label>
                                    <input
                                        type="email"
                                        defaultValue={user.email}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-purple-600"
                                    />
                                </div>
                            </div>

                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors mt-4">
                                Saqlash
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}