"use server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import path from "@/paths"
import { z} from "zod"
import {auth }from "@/auth"
import { revalidatePath } from "next/cache"


type Topic = {
  id         : string ;
  slug       : string;
  description :string;
  createdAt :  Date;
  updatedAt :  Date;
  posts?:   string;
}

interface createTopicFormState{
  errors:{
    name?: string[];
    description?: string[];
    _form?: string[];
  }
}

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/[a-z-]/, {message: "most contain lowercase letters or dashes"}),
  description: z.string().min(10),
})


export async function createTopic(
  
  formState:createTopicFormState, formData: FormData):Promise<createTopicFormState> {
    
 const  result= createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  })
  if (!result.success) { 
   
    return {
      errors:result.error.flatten().fieldErrors,
    }
  }

  const session = await auth();
  if (!session || !session.user) { 
    return { 
      errors: {
        _form: ["You must be signed in to create a topic"],},};}
  
     let topic: Topic ;
     try {
      // 1. Check if topic exists first (for better UX)
      const existingTopic = await db.topic.findUnique({
        where: { slug: result.data.name },
      });
  
      if (existingTopic) {
        return {
          errors: {
            _form: ["A topic with this name already exists"],
            name: ["This topic name is already taken"],
          },
        };
      }
  
      // 2. Create topic (DB will enforce uniqueness if two requests race)
      const topic = await db.topic.create({
        data: {
          slug: result.data.name,
          description: result.data.description,
        },
      });
  
      revalidatePath(path.home());
      revalidatePath("/topic");
      redirect(path.showTopics(topic.slug));
  
    } catch (err) {
      // 3. Fallback error handling (in case of race condition)
      if (err instanceof Error && err.message.includes("Unique constraint")) {
        return {
          errors: {
            _form: ["This topic was just created by someone else!"],
            name: ["Please try a different name"],
          },
        };
      }
      return { errors: { _form: ["Something went wrong"] } };
    }
};