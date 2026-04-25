"use client";

import Image from "next/image";
import Link from "next/link";

// Заглушки для демонстрации (потом будет база данных)
const MOCK_STORIES = [
  { id: 1, name: "Gastro Mood", img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=150&h=150&fit=crop" },
  { id: 2, name: "White Rabbit", img: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=150&h=150&fit=crop" },
  { id: 3, name: "Шеф Алексей", img: "https://images.unsplash.com/photo-1583394293214-28ez1c9f18a7?w=150&h=150&fit=crop" },
  { id: 4, name: "Новости", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=150&h=150&fit=crop" },
  { id: 5, name: "Ваше", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&h=150&fit=crop" },
];

export function StoryBar() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4 py-2">
      {MOCK_STORIES.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-rose-500 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
              <Image 
                src={story.img} 
                alt={story.name} 
                width={64} 
                height={64} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <span className="text-xs text-stone-600 truncate w-16 text-center">{story.name}</span>
        </div>
      ))}
    </div>
  );
}

