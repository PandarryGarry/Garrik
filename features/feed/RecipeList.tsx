import { Recipe } from "@core/domain/recipe";
import { RecipeCard } from "./RecipeCard";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500 text-lg">
          Пока нет рецептов
        </p>
        <a href="/submit" className="text-stone-950 font-semibold mt-2 inline-block hover:underline">
          Добавьте первый
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

