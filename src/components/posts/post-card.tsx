import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, MessageSquare } from "lucide-react";
// import type { PostWithData } from "@/db/queries/posts";
import { formatDate } from "@/lib/utils";
import paths from "@/paths";


interface AllPostProps {
    post: {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        _count: { comments: number };
        topic: { slug: string };
    };
    user: {
        name?: string | null;
        image?: string | null;
    };
  index?: number;
}

export function AllPost({ post, index ,user}: AllPostProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {index !== undefined && (
            <span className="text-muted-foreground font-bold">{index + 1}</span>
          )}
          <CardTitle className="text-lg capitalize">
          <Link href={paths.postShow(post.topic.slug, post.id)}>
              {post.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground line-clamp-2 capitalize">
          {post.content}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center py-2">
      
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
          {user.image && (
                  <img 
                    src={user.image} 
                    alt={user.name || 'User'} 
                    className="w-8 h-8 rounded-full "
                  />
                )}
                <span className="text-sm text-gray-600 ">
                  {user?.name || 'Anonymous'}
                </span>
          </span>
          <span className="lg:flex items-center gap-1 text-muted-foreground  hidden">
            <MessageSquare className="h-4 w-4" />
            {post._count.comments}
          </span>
          <span className="text-muted-foreground md:block hidden">
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