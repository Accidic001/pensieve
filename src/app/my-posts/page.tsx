import { auth } from "@/auth";
import PostList from "@/components/posts/post-list";
import { fetchPostsByUserId } from "@/db/queries/posts";
import { redirect } from "next/navigation";

export default async function MyPostsPage() {
  const session = await auth();

  // More thorough session check
  if (!session || !session.user || !session.user.id) {
    redirect("/auth/signin");
  }

  // TypeScript now knows session.user exists
  const userId = session.user.id;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Posts</h1>
      </div>

      <div className="space-y-4">
        <PostList fetchData={() => fetchPostsByUserId(userId)} />
      </div>
    </div>
  );
}