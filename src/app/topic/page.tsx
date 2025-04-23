// app/topics/page.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, } from "lucide-react";
import  paths  from "@/paths";
import { db } from "@/db";
import TopicCreateForm from "@/components/topics/topic-create-form";
import { SearchInput } from "@/components/search-input";

interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  postCount: number;
  lastUpdated: Date;
}

export default async function TopicsPage() {
  const topics = await db.topic.findMany({
    include: {
      _count: {
        select: { posts: true }
      },
      posts: {
        orderBy: { updatedAt: 'desc' },
        take: 1
      }
    }
  });

  const formattedTopics = topics.map(topic => ({
    id: topic.id,
    slug: topic.slug,
    // title: topic.title,
    description: topic.description,
    postCount: topic._count.posts,
    lastUpdated: topic.posts[0]?.updatedAt || topic.createdAt
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discussion Topics</h1>
          <p className="text-muted-foreground">
            Browse through all available discussion categories
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              className="pl-9 w-full md:w-[300px]"
            /> */}
            <SearchInput/>
          </div>
          
          <TopicCreateForm />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {formattedTopics.map((topic) => (
          <Link key={topic.id} href={paths.showTopics(topic.slug)}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg capitalize">{topic.slug}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 capitalize">{topic.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{topic.postCount} posts</span>
                  <span>
                    Last updated: {topic.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {formattedTopics.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center max-w-md">
            <h3 className="text-xl font-medium mb-2">No topics yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to create a discussion topic in our community.
            </p>
            <Button asChild>
              <Link href={paths.home()}>Create a Topic</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}