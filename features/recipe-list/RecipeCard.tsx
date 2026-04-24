"use client";

import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@core/domain/recipe";
import { Clock } from "lucide-react";
import { Card } from "@ui/components";
import { useState } from "react";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/recipe/${recipe.slug}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="relative h-56 bg-stone-100">
          <Image
            src={imageError ? "/images/placeholder.jpg" : recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-amber-600 transition">
            {recipe.title}
          </h3>
          <p className="text-stone-500 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <div className="mt-auto flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-100">
            <span className="font-medium text-stone-600">{recipe.author}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" /> 
              {recipe.createdAtFormatted}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

