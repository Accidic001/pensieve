import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import { db } from '@/db';

interface TopicShowPageProps {
  params: {
    slug: string
  }
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  // No async needed here - params are available synchronously
  const { slug } = params;

  // Your data fetching should happen in child components or via async functions
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-4 lg:col-span-3 p-2 md:col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        {/* Move async operations to child components */}
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div className="hidden lg:block md:block">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}

// Optional: Generate static paths at build time
export async function generateStaticParams() {
  const topics = await db.topic.findMany({
    select: { slug: true }
  });
  
  return topics.map((topic) => ({
    slug: topic.slug
  }));
}

export const dynamic = 'auto'; // Let Next.js decide the best rendering mode