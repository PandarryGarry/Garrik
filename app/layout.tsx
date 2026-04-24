import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ChefHat } from "lucide-react";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Gastro Mood | Кулинарная платформа",
  description: "Делитесь рецептами, находите вдохновение",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold text-stone-900">
              <ChefHat className="text-amber-600" size={20} />
              <span>Gastro Mood</span>
            </Link>
            <nav className="hidden sm:flex gap-6">
              <Link href="/" className="text-stone-600 hover:text-stone-900 transition">
                Главная
              </Link>
              <Link href="/submit" className="text-stone-600 hover:text-stone-900 transition">
                Добавить рецепт
              </Link>
            </nav>
            <Link 
              href="/submit" 
              className="sm:hidden btn-primary px-4 py-2 text-sm"
              aria-label="Добавить рецепт"
            >
              +
            </Link>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-stone-200 py-8 text-center text-stone-500 text-sm">
          © {new Date().getFullYear()} Gastro Mood. Все права защищены.
        </footer>
      </body>
    </html>
  );
}

