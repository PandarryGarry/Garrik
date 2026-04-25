"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: 'all', label: 'Всё' },
  { id: 'recipe', label: 'Рецепты' },
  { id: 'event', label: 'Гастроужины' },
  { id: 'news', label: 'Новости' },
];

export function Tabs({ currentTab }: { currentTab: string }) {
  const pathname = usePathname();

  return (
    <div className="flex overflow-x-auto gap-2 px-4 pb-3 scrollbar-hide">
      {tabs.map(tab => (
        <Link 
          key={tab.id}
          href={tab.id === 'all' ? pathname : `${pathname}?tab=${tab.id}`}
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${currentTab === tab.id 
              ? 'bg-stone-900 text-white' 
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}
          `}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

