export type PostType = 'recipe' | 'event' | 'news' | 'ad';

export interface Post {
  id: string;
  type: PostType;
  slug: string;
  author: string;
  title: string;
  content: string; // Описание или текст новости

  // Специфичные поля (могут быть пустыми)
  ingredients?: string[];
  steps?: string[];
  date?: string; // Для событий
  location?: string; // Для событий
  imageUrl: string;

  createdAt: string;
  createdAtFormatted: string;
}

export interface PostRepository {
  save(input: any): Promise<Post>;
  findBySlug(slug: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
}

