import { TopPostsList } from '@/components/posts/top-post';
import { fetchTopPosts } from '@/db/queries/posts';

export default function TopPostsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Top Posts</h1>
        <TopPostsList fetchData={fetchTopPosts} />
      </div>
    </div>
  );
}