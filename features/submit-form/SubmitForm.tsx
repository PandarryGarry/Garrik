"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@ui/components";
import { UtensilsCrossed, Calendar, Newspaper } from "lucide-react";
import { toast } from "sonner";

export function SubmitForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState<"recipe" | "event" | "news">("recipe");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      type: postType,
      title: formData.get("title"),
      content: formData.get("content"),
      imageUrl: formData.get("imageUrl"),
      author: formData.get("author"),
      ingredients: postType === 'recipe' ? String(formData.get("ingredients")).split("\n").filter(Boolean) : undefined,
      steps: postType === 'recipe' ? String(formData.get("steps")).split("\n").filter(Boolean) : undefined,
      date: formData.get("date"),
      location: formData.get("location"),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Опубликовано! 🎉");
      router.push(`/recipe/${data.slug}`);
    } catch (err: any) {
      toast.error(err.message || "Не удалось опубликовать");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Что публикуем?</h1>

      {/* Выбор типа поста */}
      <div className="flex gap-3 mb-8 justify-center">
        {[
          { id: 'recipe', label: 'Рецепт', icon: UtensilsCrossed },
          { id: 'event', label: 'Гастроужин', icon: Calendar },
          { id: 'news', label: 'Новость', icon: Newspaper },
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPostType(item.id as any)}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all w-24
              ${postType === item.id 
                ? 'border-stone-900 bg-stone-50 text-stone-900' 
                : 'border-transparent bg-white text-stone-400 hover:bg-stone-50'}
            `}
          >
            <item.icon size={24} />
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="input-label">Заголовок</label>
          <Input name="title" placeholder={postType === 'recipe' ? "Название блюда" : "Заголовок"} required />
        </div>

        <div>
          <label className="input-label">Описание / Текст</label>
          <textarea name="content" className="input min-h-[100px] resize-none" placeholder="Расскажите подробнее..." required />
        </div>

        {/* Поля для Рецепта */}
        {postType === 'recipe' && (
          <div className="grid sm:grid-cols-2 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
            <div>
              <label className="input-label">Ингредиенты</label>
              <textarea name="ingredients" className="input font-mono text-sm min-h-[150px]" placeholder="Каждый с новой строки" required />
            </div>
            <div>
              <label className="input-label">Шаги</label>
              <textarea name="steps" className="input font-mono text-sm min-h-[150px]" placeholder="Каждый с новой строки" required />
            </div>
          </div>
        )}

        {/* Поля для Гастроужина */}
        {postType === 'event' && (
          <div className="grid sm:grid-cols-2 gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div>
              <label className="input-label">Дата</label>
              <Input name="date" type="date" required />
            </div>
            <div>
              <label className="input-label">Место</label>
              <Input name="location" placeholder="Название ресторана" required />
            </div>
          </div>
        )}

        <div>
          <label className="input-label">Фото (Ссылка)</label>
          <Input name="imageUrl" type="url" placeholder="https://..." required />
        </div>

        <div>
          <label className="input-label">Автор</label>
          <Input name="author" placeholder="Ваше имя" required />
        </div>

        <Button type="submit" variant="primary" className="w-full mt-4" isLoading={loading}>
          Опубликовать
        </Button>
      </form>
    </div>
  );
}

