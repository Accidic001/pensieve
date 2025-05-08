import { auth } from "@/auth";
import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import { fetchPostsByUserId } from "@/db/queries/posts";


interface MyPostPageProps{
  params: Promise<{ slug: string }>; // params is now a Promise
}




export default async function MyPostsPage({ params }: MyPostPageProps) {
  const { slug } = await params; // ✅ await params correctly
  const session = await auth();

  // More thorough session check
  if (!session || !session.user || !session.user.id) {
     return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">You need to be logged in to view this page.</h1>
      </div>
     )
  }

  // TypeScript now knows session.user exists
  const userId = session.user.id;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Posts</h1>
      </div>
      <div className="flex justify-around">
        <PostCreateForm slug={slug}/>
        <TopicCreateForm/>
      </div>
      <div className="space-y-4">
        <PostList fetchData={() => fetchPostsByUserId(userId)} />
      </div>
    </div>
  );
}