import fs from "fs/promises";
import path from "path";
import { Recipe, RecipeInput, RecipeRepository } from "../domain/recipe";

const DB_PATH = path.join(process.cwd(), "data", "recipes.json");

export class JsonRecipeRepository implements RecipeRepository {
  private async readAll(): Promise<Recipe[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data) as Recipe[];
    } catch {
      return [];
    }
  }

  private async writeAll(recipes: Recipe[]): Promise<void> {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(recipes, null, 2), "utf-8");
  }

  async save(input: RecipeInput): Promise<Recipe> {
    const recipes = await this.readAll();
    const newRecipe: Recipe = {
      ...input,
      id: crypto.randomUUID(),
      slug: this.generateUniqueSlug(input.title, recipes),
      createdAt: new Date().toISOString(),
      createdAtFormatted: new Date().toLocaleDateString("ru-RU", {
        timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric"
      }),
    };
    recipes.unshift(newRecipe);
    await this.writeAll(recipes);
    return newRecipe;
  }

  private generateUniqueSlug(title: string, recipes: Recipe[]): string {
    const baseSlug = slugify(title, { lower: true, strict: true, replacement: "-", locale: "ru" });
    let slug = baseSlug;
    let counter = 1;
    while (recipes.some(r => r.slug === slug)) {
      slug = `${baseSlug}-${counter++}`;
    }
    return slug;
  }

  async findBySlug(slug: string): Promise<Recipe | null> {
    const recipes = await this.readAll();
    return recipes.find(r => r.slug === slug) || null;
  }

  async findAll(): Promise<Recipe[]> {
    return await this.readAll();
  }
}

