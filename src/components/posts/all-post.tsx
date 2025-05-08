
import { db } from '@/db';
import { AllPost } from './post-card';

export default async function PostsPage() {
  // Fetch all posts with their related data
  const posts = await db.post.findMany({
    include: {
      topic: {
        select: {
         
          slug: true,
        },
      },
      _count: { select: { comments: true } },
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Be the first to create one!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            // <article 
            //   key={post.id} 
            //   className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            // >
            //   <div className="flex items-center gap-3 mb-3">
            //     {post.user.image && (
            //       <img 
            //         src={post.user.image} 
            //         alt={post.user.name || 'User'} 
            //         className="w-8 h-8 rounded-full"
            //       />
            //     )}
            //     <span className="text-sm text-gray-600">
            //       {post.user?.name || 'Anonymous'}
            //     </span>
            //     <span className="text-sm text-gray-400">•</span>
            //     <span className="text-sm text-gray-600">
            //       {new Date(post.createdAt).toLocaleDateString()}
            //     </span>
            //   </div>
              
            //   <Link 
            //     href={`/topics/${post.topic.slug}/post/${post.id}`}
            //     className="hover:underline"
            //   >
            //     <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            //   </Link>
              
            //   <p className="text-gray-700 mb-3 line-clamp-2">
            //     {post.content}
            //   </p>
              
            //   <div className="flex justify-between items-center">
            //     <Link
            //       href={`/topics/${post.topic.slug}`}
            //       className="text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
            //     >
            //       {post.topic.slug}
            //     </Link>
                
            //     <Link
            //       href={`/topics/${post.topic.slug}/post/${post.id}`}
            //       className="text-sm text-blue-600 hover:underline"
            //     >
            //       Read more →
            //     </Link>
            //   </div>
            // </article>
            <AllPost
              key={post.id}
              post={post} user={{
                name: post.user.name,
                image: post.user.image
              }}/>
          ))}
        </div>
      )}
    </div>
  );
}