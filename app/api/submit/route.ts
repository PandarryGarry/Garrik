import { NextResponse } from "next/server";
import { JsonRecipeRepository } from "@core/storage/json-storage";
import { validateRecipe } from "@core/services/validation";
import { createRecipe } from "@core/services/recipe.service";

export const config = {
  api: { bodyParser: { sizeLimit: "1mb" } }
};

const repo = new JsonRecipeRepository();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = validateRecipe(body);
    const recipe = createRecipe(validated);
    await repo.save(recipe);

    return NextResponse.json(
      { success: true, slug: recipe.slug }, 
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Ошибка сервера" }, 
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }
}

