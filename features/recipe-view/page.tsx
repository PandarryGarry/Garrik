import { JsonPostRepository } from "@core/storage/json-storage";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, BookOpen, Share2 } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

const repo = new JsonPostRepository();

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await repo.findBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full bg-stone-100">
        <Image src={post.imageUrl} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <Link href="/" className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition">
          <ArrowLeft size={24} />
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-stone-100">

          {/* Header */}
          <div className="mb-8 border-b border-stone-100 pb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold uppercase tracking-wide">
                {post.type === 'recipe' ? 'Рецепт' : post.type === 'event' ? 'Гастроужин' : 'Новость'}
              </span>
              <span className="text-stone-400 text-sm">{post.createdAtFormatted}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-stone-600 leading-relaxed">{post.content}</p>

            {post.type === 'event' && (
              <div className="mt-4 flex flex-wrap gap-4 text-stone-500">
                <span className="flex items-center gap-2"><Calendar size={16}/> {post.date}</span>
                <span className="flex items-center gap-2"><MapPin size={16}/> {post.location}</span>
              </div>
            )}
          </div>

          {/* Recipe Content */}
          {post.type === 'recipe' && (
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🥗</span>
                  Ингредиенты
                </h3>
                <ul className="space-y-2">
                  {post.ingredients?.map((ing, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-700">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">👨‍🍳</span>
                  Приготовление
                </h3>
                <ol className="space-y-4">
                  {post.steps?.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</span>
                      <p className="text-stone-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Share Button */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex justify-center">
            <button 
              onClick={async () => {
                try {
                  if (navigator.share) {
                    await navigator.share({
                      title: post.title,
                      text: post.content,
                      url: `${window.location.origin}/recipe/${post.slug}`,
                    });
                  } else {
                    await navigator.clipboard.writeText(`${window.location.origin}/recipe/${post.slug}`);
                    alert("Ссылка скопирована!");
                  }
                } catch (err) {
                  // Отмена шеринга — ок
                }
              }}
              className="btn-ghost gap-2"
            >
              <Share2 size={18} /> Поделиться рецептом
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

