import { RecipeInput } from "../domain/recipe";

export function validateRecipe(input: unknown): RecipeInput {
  if (!input || typeof input !== "object") {
    throw new Error("Некорректные данные");
  }

  const data = input as Record<string, unknown>;

  const title = String(data.title || "").trim();
  if (title.length < 3 || title.length > 100) {
    throw new Error("Название должно содержать от 3 до 100 символов");
  }

  const imageUrl = String(data.imageUrl || "").trim();
  if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
    throw new Error("Некорректная ссылка на изображение");
  }

  const author = String(data.author || "").trim();
  if (author.length < 2) {
    throw new Error("Укажите имя автора");
  }

  const ingredients = Array.isArray(data.ingredients) 
    ? data.ingredients.map((i: unknown) => String(i).trim()).filter(Boolean)
    : [];
  if (ingredients.length === 0) {
    throw new Error("Добавьте хотя бы один ингредиент");
  }

  const steps = Array.isArray(data.steps)
    ? data.steps.map((s: unknown) => String(s).trim()).filter(Boolean)
    : [];
  if (steps.length === 0) {
    throw new Error("Добавьте хотя бы один шаг приготовления");
  }

  return {
    title,
    description: String(data.description || "").trim().slice(0, 500),
    ingredients,
    steps,
    imageUrl,
    author,
  };
}

