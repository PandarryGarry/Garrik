"use client";

import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@core/domain/recipe";
import { Heart } from "lucide-react";
import { useState, memo } from "react";

export const RecipeCard = memo(function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/recipe/${recipe.slug}`} className="block group">
      <article className="card card-hover">
        {/* Изображение */}
        <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-stone-100 animate-pulse" />
          )}
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105
                       ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {/* Оверлей при наведении */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Контент */}
        <div className="p-4">
          <h3 className="font-semibold text-base mb-1.5 line-clamp-2 group-hover:text-stone-600 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-stone-500 text-sm line-clamp-2 mb-3">
            {recipe.description}
          </p>

          {/* Автор */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 
                            flex items-center justify-center text-xs font-semibold">
                {recipe.author.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-stone-600 truncate max-w-[120px]">
                {recipe.author}
              </span>
            </div>
            <span className="text-xs text-stone-400">
              {recipe.createdAtFormatted}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
});

