import type { Post } from '@prisma/client';
import { db } from '@/db';


export type PostWithData = (
    Post& {
        user: { name: string | null };
        topic: { slug: string };
        _count: { comments: number, };
    })



    export async function  fetchPostsByTopicSlug (slug: string):Promise<PostWithData[]> {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            user: { select: { name: true } },
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
        },
    });

}


// db/queries/posts.ts
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
        _count: { select: { comments: true} },
      },
    });
  }