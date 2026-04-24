import { JsonRecipeRepository } from "@core/storage/json-storage";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChefHat, ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { Card } from "@ui/components";

const repo = new JsonRecipeRepository();

export default async function RecipePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const recipe = await repo.findBySlug(slug);
  if (!recipe) notFound();

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 transition"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Назад
        </Link>

        <Card className="overflow-hidden">
          <div className="relative h-72 sm:h-96 bg-stone-100">
            <Image 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <div className="p-6 sm:p-10 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                <span className="flex items-center gap-1">
                  <User size={14} aria-hidden="true" /> {recipe.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} aria-hidden="true" /> {recipe.createdAtFormatted}
                </span>
              </div>
            </div>
            <p className="text-lg text-stone-700 italic border-l-4 border-amber-500 pl-4">
              {recipe.description}
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  <ChefHat size={20} className="text-amber-600" aria-hidden="true" />
                  Ингредиенты
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1" aria-hidden="true">•</span> 
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold text-xl mb-4">Приготовление</h2>
                <ol className="space-y-4">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                        {i+1}
                      </span>
                      <p className="text-stone-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

