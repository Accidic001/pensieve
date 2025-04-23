import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors" href={paths.showTopics(slug)}>
        {"←"}Back to {slug}
      </Link>
      <PostShow postId= {postId}/>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList  fetchData={()=> fetchCommentsByPostId(postId)} />
    </div>
  );
}
