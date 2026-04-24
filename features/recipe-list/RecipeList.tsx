import { Recipe } from "@core/domain/recipe";
import { RecipeCard } from "./RecipeCard";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-stone-500">
          Пока нет рецептов.{" "}
          <a href="/submit" className="text-amber-600 hover:underline font-medium">
            Добавьте первый
          </a>
        </p>
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

