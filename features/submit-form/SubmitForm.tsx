"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card } from "@ui/components";

export function SubmitForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          ingredients: String(formData.get("ingredients") || "")
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean),
          steps: String(formData.get("steps") || "")
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean),
          imageUrl: formData.get("imageUrl"),
          author: formData.get("author"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сохранения");

      router.push(`/recipe/${data.slug}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Не удалось опубликовать. Проверьте данные.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
            {error}
          </div>
        )}

        <Input 
          name="title" 
          label="Название рецепта *" 
          placeholder="Борщ по-киевски" 
          required 
          maxLength={100} 
          aria-required="true"
        />

        <Input 
          name="description" 
          label="Краткое описание" 
          placeholder="Пару слов о блюде..." 
          maxLength={500} 
        />

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-stone-700">Ингредиенты *</label>
            <textarea 
              name="ingredients" 
              className="input-field font-mono text-sm min-h-[150px]" 
              placeholder="500 г свинины&#10;2 луковицы&#10;3 зубчика чеснока" 
              required 
              aria-required="true"
            />
            <p className="text-xs text-stone-400">Каждый ингредиент с новой строки</p>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-stone-700">Шаги приготовления *</label>
            <textarea 
              name="steps" 
              className="input-field font-mono text-sm min-h-[150px]" 
              placeholder="Нарезать мясо кубиками&#10;Обжарить на среднем огне&#10;Добавить лук и чеснок" 
              required 
              aria-required="true"
            />
            <p className="text-xs text-stone-400">Каждый шаг с новой строки</p>
          </div>
        </div>

        <Input 
          name="imageUrl" 
          type="url" 
          label="Ссылка на фото *" 
          placeholder="https://example.com/photo.jpg" 
          required 
          aria-required="true"
        />

        <Input 
          name="author" 
          label="Ваше имя *" 
          placeholder="Алексей К." 
          required 
          maxLength={50} 
          aria-required="true"
        />

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full" 
          isLoading={loading}
          aria-busy={loading}
        >
          {loading ? "Публикация..." : "Опубликовать рецепт"}
        </Button>
      </form>
    </Card>
  );
}

