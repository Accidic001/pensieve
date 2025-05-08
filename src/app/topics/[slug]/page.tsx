import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import Link from "next/link";


interface PageProps {
  params: Promise<{ slug: string }>; // params is now a Promise
  
}

export default async function TopicShowPage({ params }: PageProps) {
  const { slug } = await params; // ✅ await params correctly

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
     
      
      <div className="col-span-4 lg:col-span-3 p-2 md:col-span-3">
      <div className="p-2 mb-4">
      <Link
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        href="/topic"
      >
        {"←"}Back to Topics
      </Link>
      </div>
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div className="hidden lg:block md:block">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
