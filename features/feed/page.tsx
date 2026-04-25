import { JsonPostRepository } from "@core/storage/json-storage";
import { StoryBar } from "./StoryBar";
import { SmartPostCard } from "./SmartPostCard";
import { Tabs } from "./Tabs";
import { Skeleton } from "@ui/components/Skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const repo = new JsonPostRepository();

export default async function FeedPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string; tab?: string }> 
}) {
  const { q, tab } = await searchParams;
  let posts = await repo.findAll();

  // Фильтрация по вкладкам
  if (tab && tab !== 'all') {
    posts = posts.filter(p => p.type === tab);
  }

  // Поиск
  if (q?.trim()) {
    const query = q.toLowerCase();
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.author.toLowerCase().includes(query)
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Верхняя часть: Stories + Tabs */}
      <div className="bg-white border-b border-stone-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="pt-4">
            <StoryBar />
          </div>
          <Tabs currentTab={tab || 'all'} />
        </div>
      </div>

      {/* Лента контента */}
      <div className="max-w-xl mx-auto px-4 pt-6">
        {posts.length === 0 ? (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-stone-100">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          posts.map(post => <SmartPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

