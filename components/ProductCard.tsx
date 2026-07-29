'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useSaralanganStore } from '@/store/useSaralanganStore';
import { useThemeStore } from '@/store/useThemeStore';

interface Product {
  id: number | string;
  title?: string;
  price?: number;
  oldPrice?: number;
  imageUrl?: string;
  image?: string;
  rating?: number | { rate: number; count: number };
}

interface ProductCardProps {
  product?: Product;
  id?: number | string;
  title?: string;
  price?: number;
  oldPrice?: number;
  imageUrl?: string;
  image?: string;
  rating?: number | { rate: number; count: number };
  reviewCount?: number;
  locale: string;
}

export default function ProductCard(props: ProductCardProps) {
  const locale = props.locale || 'uz';
  const productData = props.product || props;
  const id = productData.id;

  if (!id) return null;

  const title = productData.title || props.title || "Mahsulot";
  const rawPrice = productData.price !== undefined ? productData.price : props.price;
  const price = Number(rawPrice) || 0;
  
  const rawOldPrice = productData.oldPrice !== undefined ? productData.oldPrice : props.oldPrice;
  const oldPrice = rawOldPrice !== undefined ? Number(rawOldPrice) || 0 : undefined;

  const imageSrc = productData.imageUrl || productData.image || props.imageUrl || props.image || '';

  const { theme } = useThemeStore();
  const { cart, toggleCart, incrementQuantity, decrementQuantity } = useCartStore();
  const { saralanganIds, toggleSaralangan } = useSaralanganStore();

  const numericId = Number(id);
  const isSaralangan = Array.isArray(saralanganIds) && saralanganIds.includes(numericId);
  
  const cartItem = cart.find((item) => Number(item.id) === numericId);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Xavfsiz formatPrice funksiyasi (undefined yoki null kelsa ham xato bermaydi)
  const formatPrice = (val?: any) => {
    const num = Number(val);
    if (isNaN(num)) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart(numericId);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    incrementQuantity(numericId);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    decrementQuantity(numericId);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaralangan(numericId);
  };

  return (
    <Link
      href={`/${locale}/product/${id}`}
      className={`group relative flex flex-col justify-between p-4 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${
        theme === 'dark'
          ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 shadow-lg'
          : 'bg-white border-gray-200/60 hover:shadow-xl hover:shadow-gray-200/50'
      }`}
    >
      <div className="relative w-full h-48 sm:h-52 rounded-2xl bg-gray-100 dark:bg-zinc-800/50 p-4 flex items-center justify-center overflow-hidden">
        <button
          onClick={handleWishlist}
          aria-label="Wishlist"
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm ${
            isSaralangan
              ? 'bg-red-50 text-red-500 dark:bg-red-950/50'
              : 'bg-white/80 dark:bg-zinc-900/80 text-gray-600 dark:text-zinc-400 hover:text-red-500'
          }`}
        >
          <Heart size={16} className={isSaralangan ? 'fill-red-500 text-red-500' : ''} />
        </button>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <ShoppingBag className="text-gray-400" size={32} />
        )}
      </div>

      <div className="py-4 space-y-2 flex-1 flex flex-col justify-between">
        <h3 className="text-xs sm:text-sm font-bold line-clamp-2 text-gray-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-base font-extrabold text-purple-600 dark:text-purple-400">
              {formatPrice(price)} uzs
            </p>
            {oldPrice !== undefined && oldPrice > price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              onClick={handleToggleCart}
              className="w-full py-2.5 px-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-extrabold text-xs hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag size={14} />
              <span>Savatga</span>
            </button>
          ) : (
            <div 
              onClick={(e) => e.preventDefault()}
              className="flex items-center justify-between bg-purple-600 text-white p-1 rounded-2xl shadow-lg shadow-purple-600/20"
            >
              <button
                onClick={handleDecrement}
                className="w-8 h-8 rounded-xl bg-purple-700 flex items-center justify-center hover:bg-purple-800 active:scale-95 transition-all"
              >
                <Minus size={14} />
              </button>
              <span className="text-xs font-black px-3">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 rounded-xl bg-purple-700 flex items-center justify-center hover:bg-purple-800 active:scale-95 transition-all"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}