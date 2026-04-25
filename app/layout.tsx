import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Gastro Mood",
  description: "Кулинарная платформа для ценителей вкуса",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-stone-950`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat size={24} className="text-stone-950" />
              <span className="font-bold text-lg">Gastro Mood</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-stone-600 hover:text-stone-950 font-medium transition">
                Лента
              </Link>
              <Link href="/submit" className="btn-primary">
                Добавить
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-100 py-8 text-center text-stone-400 text-sm">
          © {new Date().getFullYear()} Gastro Mood
        </footer>

        {/* Toast Notifications */}
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}

