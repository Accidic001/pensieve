import { db } from '@/db';

// Define the base Post type if Prisma isn't generating it
type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostWithData = Post & {
  user: { name: string | null; image?: string | null };
  topic: { slug: string };
  _count: { comments: number };
};

export async function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function fetchTopPosts(limit = 5): Promise<PostWithData[]> {
  return db.post.findMany({
    take: limit,
    orderBy: [
      { comments: { _count: 'desc' } },
      { createdAt: 'desc' },
    ],
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function fetchPostsByUserId(userId: string): Promise<PostWithData[]> {
  try {
    const posts = await db.post.findMany({
      where: { userId },
      include: {
        topic: { select: { slug: true } },
        user: { select: { name: true, image: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    return [];
  }
}