import slugify from "slugify";
import { Recipe, RecipeInput } from "../domain/recipe";

export function generateSlug(title: string): string {
  return slugify(title, { 
    lower: true, 
    strict: true, 
    replacement: "-",
    locale: "ru"
  });
}

export function formatDateUTC(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit", 
    year: "numeric"
  });
}

export function createRecipe(input: RecipeInput): Recipe {
  const now = new Date();
  return {
    ...input,
    id: crypto.randomUUID(),
    slug: generateSlug(input.title),
    createdAt: now.toISOString(),
    createdAtFormatted: formatDateUTC(now.toISOString()),
  };
}

