"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import * as actions from "@/actions";
import { useActionState } from 'react'
import FormButton from "../common/form-botton";
import { PlusCircle } from "lucide-react";

interface PostCreateFormProps {
    slug: string;
    }

export default function    PostCreateForm({slug}: PostCreateFormProps) {
  const [formState, action] = useActionState(actions.createPost.bind(null,slug), { errors: {} });

  return (
    <Popover>
      <PopoverTrigger>
      <h1 className="flex items-center gap-2 p-3 bg-accent rounded">Create Post <PlusCircle className="h-4 w-4 mr-2  " /></h1>
      </PopoverTrigger>
      <PopoverContent   className=" gap-4 w-full  h-auto overflow-hidden">
        <form action={action} >
          <div className="flex flex-col gap-4 p-4 w-80 h-full">
            <h3 className="text-lg font-semibold">Create a Post</h3>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Post Title"
              className={formState.errors.title ? "border-red-500" : ""}
            />
            {formState.errors.title && (
              <p className="text-red-500 text-sm">
                {formState.errors.title.join(", ")}
              </p>
            )}
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Topic Content"
              rows={4}
              className={`resize-none min-h-[100px] max-h-[200px] overflow-y-auto ${
                formState.errors.content ? "border-red-500" : ""
              }`}
            />
            {formState.errors.content && (
              <p className="text-red-500 text-sm">
                {formState.errors.content.join(", ")}
              </p>
            )}
            {formState.errors._form ? (<div className="p-2 rounded bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
            </div>):null}
            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}