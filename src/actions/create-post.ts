"use server";

import { redirect } from "next/navigation";
// import type { Post } from "@prisma/client";
import { db } from "@/db";
import path from "@/paths";
import { z } from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";


type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),  // Fixed from 'tittle' to 'title'
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a post"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id!,
        topicId: topic.id,
      }
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: { _form: [err.message] },
      };
    } else {
      return {
        errors: { _form: ["Failed to create post"] },  // More generic error
      };
    }
  }

  revalidatePath(path.showTopics(slug));
  revalidatePath(path.postShow(slug, post.id));
  revalidatePath(path.home());
  redirect(path.postShow(slug, post.id));
}