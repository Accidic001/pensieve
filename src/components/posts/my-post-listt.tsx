import type { PostWithData } from "@/db/queries/posts";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No posts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <div key={post.id} className="border rounded p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.user.image || "/default-avatar.png"}
              alt={post.user.name || "User"}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{post.user.name}</span>
          </div>
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-gray-600 mb-2">{post.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Topic: {post.topic.slug}</span>
            <span>{post._count.comments} comments</span>
          </div>
        </div>
      ))}
    </div>
  );
}