
import PostCreateForm from '@/components/posts/post-create-form';
import { TopPostsList } from '@/components/posts/top-post';
import { fetchTopPosts } from '@/db/queries/posts';


interface TopPostPageProps {
  params: Promise<{ slug: string }>; // params is now a Promise
  
}

export default async function TopPostsPage({ params }: TopPostPageProps) {
  const { slug } = await params; // ✅ await params correctly
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Top Posts</h1>
        <div className='p-3'><PostCreateForm slug={slug}/></div>
        
        <TopPostsList fetchData={fetchTopPosts} />
       
      </div>
    </div>
  );
}