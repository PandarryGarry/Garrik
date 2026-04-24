export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string;
  author: string;
  createdAt: string;
  createdAtFormatted: string;
}

export interface RecipeInput {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string;
  author: string;
}

export interface RecipeRepository {
  save(input: RecipeInput): Promise<Recipe>;
  findBySlug(slug: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
}

