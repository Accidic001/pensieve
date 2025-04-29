// import type { Comment } from "@prisma/client";
import {db} from "@/db"





type Comment = {
    id:string;
    content:string;
    createdAt:Date;
    updatedAt:Date;
}

export type CommentWithAuthur =(
    Comment &{user:{name:string | null,image:string|null }}
)

export function fetchCommentsByPostId(postId:string):Promise<CommentWithAuthur[]>{
   return db.comment.findMany({
    where: {postId:postId},
    include:{
        user:{
            select:{
                name:true,
                image:true
            }
        }
    }
   })
}