// lib/topics.ts
import { db } from "@/db";

export async function getTopics() {
  return await db.topic.findMany({
    include: {
      _count: {
        select: { posts: true }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
}