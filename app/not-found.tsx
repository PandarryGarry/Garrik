import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold">Страница не найдена</h2>
      <p className="text-stone-500">
        Рецепт, который вы ищете, не существует или был удалён.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:underline">
        <ArrowLeft size={16} /> Вернуться на главную
      </Link>
    </div>
  );
}

