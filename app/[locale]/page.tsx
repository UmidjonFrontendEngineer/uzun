'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { useThemeStore } from '@/store/useThemeStore';
import { Sparkles, Flame, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const dictionaries = {
  uz: {
    heroSlides: [
      {
        badge: "Yozgi chegirmalar mavsumi",
        title: "Orzuingizdagi xaridlar bir qadamda",
        desc: "Eng Sara brendlar, kafolatlangan sifat va qulay narxlar faqat bizda. Hoziriroq tanlashni boshlang!",
        btn: "Xarid qilish",
      },
      {
        badge: "Super Aksiya 50% gacha",
        title: "Eng sara elektronika mahsulotlari",
        desc: "Zamonaviy gadjetlar va maishiy texnikalarni eng hamyonbop narxlarda xarid qiling.",
        btn: "Ko'rish",
      },
      {
        badge: "Yangi Kolleksiya",
        title: "Siz kutgan kiyimlar keldi",
        desc: "Eng so'nggi trenddagi kiyim-kechaklar va aksessuarlar to'plami bilan ajralib turing.",
        btn: "Kashf qilish",
      },
    ],
    categoriesTitle: "Ommabop turkumlar",
    allCategories: "Barchasi",
    menClothing: "Erkaklar kiyimi",
    womenClothing: "Ayollar kiyimi",
    jewelery: "Taqinchoqlar",
    electronics: "Elektronika",
    allProducts: "Barcha mahsulotlar",
    productsFound: "ta mahsulot topildi",
    loading: "Mahsulotlar yuklanmoqda...",
  },
  ru: {
    heroSlides: [
      {
        badge: "Сезон летних скидок",
        title: "Покупки вашей мечты в один клик",
        desc: "Лучшие бренды, гарантированное качество и выгодные цены только у нас. Начните выбор прямо сейчас!",
        btn: "Купить сейчас",
      },
      {
        badge: "Супер Акция до 50%",
        title: "Лучшие электронные товары",
        desc: "Приобретайте современные гаджеты и бытовую технику по самым выгодным ценам.",
        btn: "Посмотреть",
      },
      {
        badge: "Новая Коллекция",
        title: "Одежда которую вы ждали",
        desc: "Выделяйтесь с помощью нашей последней коллекции модной одежды и аксессуаров.",
        btn: "Исследовать",
      },
    ],
    categoriesTitle: "Популярные категории",
    allCategories: "Все",
    menClothing: "Мужская одежда",
    womenClothing: "Женская одежда",
    jewelery: "Украшения",
    electronics: "Электроника",
    allProducts: "Все товары",
    productsFound: "товаров найдено",
    loading: "Загрузка товаров...",
  },
  en: {
    heroSlides: [
      {
        badge: "Summer Sale Season",
        title: "Your dream shopping is just a step away",
        desc: "Top brands, guaranteed quality, and best prices only with us. Start shopping right now!",
        btn: "Shop Now",
      },
      {
        badge: "Super Sale up to 50%",
        title: "Best electronics products",
        desc: "Get modern gadgets and home appliances at the most affordable prices.",
        btn: "View All",
      },
      {
        badge: "New Collection",
        title: "The clothes you've been waiting for",
        desc: "Stand out with our latest collection of trendy apparel and accessories.",
        btn: "Explore",
      },
    ],
    categoriesTitle: "Popular Categories",
    allCategories: "All",
    menClothing: "Men's Clothing",
    womenClothing: "Women's Clothing",
    jewelery: "Jewelery",
    electronics: "Electronics",
    allProducts: "All Products",
    productsFound: "products found",
    loading: "Loading products...",
  },
};

export default function HomePage() {
  const { theme } = useThemeStore();
  const params = useParams();

  const locale = (params?.locale as keyof typeof dictionaries) || 'uz';
  const t = dictionaries[locale] || dictionaries.uz;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Mouse drag holatlari uchun state'lar
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Avtomatik o'tish
  useEffect(() => {
    if (isMouseDown) return; // Foydalanuvchi tortayotganda avtomatik o'tishni to'xtatib turamiz
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % t.heroSlides.length;
        if (sliderRef.current) {
          const slideWidth = sliderRef.current.clientWidth;
          sliderRef.current.scrollTo({ left: slideWidth * next, behavior: 'smooth' });
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [t.heroSlides.length, isMouseDown]);

  useEffect(() => {
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

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: "men's clothing", label: t.menClothing },
    { id: "women's clothing", label: t.womenClothing },
    { id: 'jewelery', label: t.jewelery },
    { id: 'electronics', label: t.electronics },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className={`min-h-[70vh] flex items-center justify-center ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">{t.loading}</p>
        </div>
      </div>
    );
  }

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % t.heroSlides.length;
    scrollToIndex(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + t.heroSlides.length) % t.heroSlides.length;
    scrollToIndex(prev);
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      const scrollLeftPos = sliderRef.current.scrollLeft;
      const index = Math.round(scrollLeftPos / slideWidth);
      if (index !== currentIndex && index >= 0 && index < t.heroSlides.length) {
        setCurrentIndex(index);
      }
    }
  };

  // Sichqoncha orqali surish (Mouse Drag handlers)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    // Tortib qo'ygandan keyin eng yaqin slayderga snap qilish
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      const index = Math.round(sliderRef.current.scrollLeft / slideWidth);
      scrollToIndex(index);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Surish tezligi
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-gray-50/50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Hero Banner Slider (Mouse Drag + Scroll Snap) */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing select-none"
          >
            {t.heroSlides.map((slide, index) => (
              <div 
                key={index} 
                className="w-full shrink-0 snap-center p-8 sm:p-12 min-h-[280px] sm:min-h-[300px] flex items-center"
              >
                <div className="relative z-10 flex flex-col justify-center space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-xs font-semibold w-fit">
                    <Sparkles size={14} className="text-amber-300" />
                    <span>{slide.badge}</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base text-purple-100 font-medium">
                    {slide.desc}
                  </p>
                  <div className="pt-2">
                    <button className="px-6 py-3 rounded-2xl bg-white text-purple-700 font-bold text-sm hover:bg-purple-50 transition-all shadow-lg flex items-center gap-2 group w-fit">
                      <span>{slide.btn}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 right-6 z-20 flex items-center gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              {t.heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* Kategoriyalar */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
              <Flame className="text-orange-500" size={20} />
              <span>{t.categoriesTitle}</span>
            </h2>
          </div>

          <div className="overflow-x-auto scrollbar-none pb-2 cursor-grab active:cursor-grabbing">
            <div className="flex items-center gap-2 w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 shadow-sm ${selectedCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-purple-500/30 shadow-md scale-105'
                      : theme === 'dark'
                        ? 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/60'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Mahsulotlar Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
              <Tag className="text-purple-600" size={20} />
              <span>{t.allProducts}</span>
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              {filteredProducts.length} {t.productsFound}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={Math.round(item.price * 12500)}
                oldPrice={Math.round(item.price * 12500 * 1.25)}
                rating={item.rating?.rate || 4.8}
                reviewCount={item.rating?.count || 120}
                imageUrl={item.image}
              />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}