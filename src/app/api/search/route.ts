// app/api/search/route.ts
import { db } from '@/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  const [posts, topics] = await Promise.all([
    db.post.findMany({
      where: {
        OR: [
          { title: { contains: query,  } },
          { content: { contains: query,  } },
        ],
      },
      select: { id: true, title: true },
      take: 5,
    }),
    db.topic.findMany({
      where: {
        slug: { contains: query,  },
      },
      select: { slug: true },
      take: 5,
    }),
  ]);

  return NextResponse.json({ posts, topics });
}