"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@core/domain/post";
import { Calendar, MapPin, BookOpen, Sparkles, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@ui/components/Skeleton";

export function SmartPostCard({ post }: { post: Post }) {
  const [loaded, setLoaded] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareLoading(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.content,
          url: `${window.location.origin}/recipe/${post.slug}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/recipe/${post.slug}`);
        toast.success("Ссылка скопирована в буфер обмена");
      }
    } catch (err) {
      // Пользователь отменил шеринг — это нормально
    } finally {
      setShareLoading(false);
    }
  };

  // Карточка ГАСТРОУЖИНА
  if (post.type === 'event') {
    return (
      <div className="mb-8 animate-fade-in">
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-stone-100">
          <div className="relative h-48 sm:h-64">
            {!loaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              fill 
              className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              sizes="(max-width: 768px) 100vw, 640px"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-bold text-stone-900 flex items-center gap-2 shadow-sm">
              <Calendar size={16} /> {post.date}
            </div>
            <button 
              onClick={handleShare}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm hover:bg-white transition disabled:opacity-50"
              aria-label="Поделиться"
              disabled={shareLoading}
            >
              <Share2 size={18} className={shareLoading ? "animate-pulse" : ""} />
            </button>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Гастроужин
            </div>
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <div className="flex items-center gap-2 text-stone-500 text-sm mb-4">
              <MapPin size={14} /> {post.location}
            </div>
            <Link href={`/recipe/${post.slug}`} className="btn-primary w-full text-center block">
              Забронировать место
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Карточка НОВОСТИ / РЕКЛАМЫ
  if (post.type === 'news' || post.type === 'ad') {
    return (
      <div className="mb-8 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-400 uppercase">
              {post.type === 'ad' ? 'Реклама' : 'Новость'}
            </span>
            <span className="text-xs text-stone-400">{post.createdAtFormatted}</span>
          </div>
          <div className="flex gap-4">
            <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative bg-stone-100">
              {!loaded && <Skeleton className="absolute inset-0" />}
              <Image 
                src={post.imageUrl} 
                alt="" 
                fill 
                className={`object-cover transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg leading-tight mb-2">{post.title}</h3>
              <p className="text-stone-600 text-sm line-clamp-2">{post.content}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handleShare}
              className="btn-ghost text-xs gap-1"
              disabled={shareLoading}
            >
              <Share2 size={14} /> Поделиться
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Карточка РЕЦЕПТА (стандарт)
  return (
    <Link href={`/recipe/${post.slug}`} className="block mb-8 group animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-64 sm:h-80 bg-stone-100">
          {!loaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            sizes="(max-width: 768px) 100vw, 640px"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <BookOpen size={12} /> Рецепт
            </div>
            <button 
              onClick={handleShare}
              className="bg-white/90 backdrop-blur p-2 rounded-full shadow-sm hover:bg-white transition disabled:opacity-50"
              aria-label="Поделиться"
              disabled={shareLoading}
            >
              <Share2 size={16} className={shareLoading ? "animate-pulse" : ""} />
            </button>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl mb-2 group-hover:text-amber-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-stone-500 text-sm line-clamp-2 mb-4">{post.content}</p>
          <div className="flex items-center justify-between border-t border-stone-50 pt-4">
            <span className="text-sm font-medium">{post.author}</span>
            <span className="text-xs text-stone-400">{post.createdAtFormatted}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

