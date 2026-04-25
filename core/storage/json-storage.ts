import fs from "fs/promises";
import path from "path";
import { Post, PostRepository } from "../domain/post";
import slugify from "slugify";

const DB_PATH = path.join(process.cwd(), "data", "posts.json");

export class JsonPostRepository implements PostRepository {
  private async readAll(): Promise<Post[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      // Миграция старых данных: если нет type, ставим 'recipe'
      return JSON.parse(data).map((p: any) => ({ ...p, type: p.type || 'recipe' }));
    } catch {
      return [];
    }
  }

  private async writeAll(posts: Post[]): Promise<void> {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(posts, null, 2), "utf-8");
  }

  async save(input: Partial<Post>): Promise<Post> {
    const posts = await this.readAll();
    const newPost: Post = {
      id: crypto.randomUUID(),
      slug: slugify(input.title!, { lower: true, strict: true, replacement: "-", locale: "ru" }),
      createdAt: new Date().toISOString(),
      createdAtFormatted: new Date().toLocaleDateString("ru-RU", {
        timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric"
      }),
      ...input as any
    } as Post;

    posts.unshift(newPost);
    await this.writeAll(posts);
    return newPost;
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const posts = await this.readAll();
    return posts.find(p => p.slug === slug) || null;
  }

  async findAll(): Promise<Post[]> {
    return await this.readAll();
  }
}

