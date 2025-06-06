import CommentShow from "@/components/comments/comment-show";
import type { CommentWithAuthur } from "@/db/queries/comments"

interface CommentListProps {
  fetchData:() => Promise<CommentWithAuthur[]>
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({fetchData}: CommentListProps) {
   const comments = await fetchData();
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
