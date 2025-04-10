// components/top-post.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, MessageSquare } from "lucide-react";
import type { PostWithData } from "@/db/queries/posts";
import { formatDate } from "@/lib/utils";
import paths from "@/paths";



interface TopPostProps {
  post: PostWithData;
  index?: number;
}

export function TopPost({ post, index }: TopPostProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {index !== undefined && (
            <span className="text-muted-foreground font-bold">{index + 1}</span>
          )}
          <CardTitle className="text-lg">
            <Link href={paths.postShow(post.topic.slug, post.id)}>
              {post.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.content}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center py-2">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <ArrowUp className="h-4 w-4" />
            {post._count.comments}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            {post._count.comments}
          </span>
          <span className="text-muted-foreground">
            {formatDate(post.createdAt)}
          </span>
        </div>
        
        <Button variant="outline" size="sm" asChild>
          <Link href={paths.showTopics(post.topic.slug)}>
            {post.topic.slug}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Component to display a list of top posts
interface TopPostsListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export async function TopPostsList({ fetchData }: TopPostsListProps) {
  const posts = await fetchData();

  if (posts.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No popular posts found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <TopPost key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}