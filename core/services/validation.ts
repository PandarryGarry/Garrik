import { Post } from "../domain/post";

export function validatePost(input: unknown): Partial<Post> {
  if (!input || typeof input !== "object") throw new Error("Некорректные данные");
  const data = input as Record<string, unknown>;

  const type = (data.type || 'recipe') as Post.PostType;
  const title = String(data.title || "").trim();
  if (title.length < 3) throw new Error("Заголовок слишком короткий");

  const imageUrl = String(data.imageUrl || "").trim();
  if (!imageUrl.startsWith("http")) throw new Error("Некорректная ссылка на фото");

  const author = String(data.author || "").trim();
  if (author.length < 2) throw new Error("Укажите автора");

  // Валидация специфичных полей
  let ingredients: string[] = [];
  let steps: string[] = [];

  if (type === 'recipe') {
    ingredients = Array.isArray(data.ingredients) 
      ? data.ingredients.map((i: any) => String(i).trim()).filter(Boolean)
      : [];
    if (ingredients.length === 0) throw new Error("Для рецепта нужны ингредиенты");

    steps = Array.isArray(data.steps)
      ? data.steps.map((s: any) => String(s).trim()).filter(Boolean)
      : [];
    if (steps.length === 0) throw new Error("Для рецепта нужны шаги");
  }

  return {
    type,
    title,
    content: String(data.content || "").trim(),
    imageUrl,
    author,
    ingredients,
    steps,
    date: data.date ? String(data.date) : undefined,
    location: data.location ? String(data.location) : undefined,
  };
}

