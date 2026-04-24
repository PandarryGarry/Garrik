import { JsonRecipeRepository } from "@core/storage/json-storage";
import { RecipeList } from "./RecipeList";
import { SearchBar } from "./SearchBar";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@ui/components";

const repo = new JsonRecipeRepository();

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const { q } = await searchParams;
  let recipes = await repo.findAll();

  if (q?.trim()) {
    const query = q.toLowerCase().trim();
    recipes = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query) ||
      recipe.author.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
    );
  }

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs">
            <Sparkles size={14} className="text-amber-500" aria-hidden="true" /> 
            Платформа для ценителей
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Вкус — это <span className="text-amber-600">эстетика</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Gastro Mood — где рецепты превращаются в истории. 
            Делитесь своими кулинарными шедеврами с сообществом.
          </p>
          <Link href="/submit">
            <Button variant="primary" className="gap-2">
              Опубликовать рецепт <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h2 className="text-2xl font-semibold">Лента рецептов</h2>
          <SearchBar />
        </div>
        <RecipeList recipes={recipes} />
      </section>
    </div>
  );
}

