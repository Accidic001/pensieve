"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import * as actions from "@/actions";
import { useActionState } from 'react'
import FormButton from "../common/form-botton";


export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, { errors: {} });

  return (
    <Popover>
      <PopoverTrigger>
        <h1 className="p-3 bg-accent rounded">Create Topic</h1>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-semibold">Create a new topic</h3>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Topic Title"
              className={formState.errors.name ? "border-red-500" : ""}
            />
            {formState.errors.name && (
              <p className="text-red-500 text-sm">
                {formState.errors.name.join(", ")}
              </p>
            )}
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Topic Description"
              className={formState.errors.description ? "border-red-500" : ""}
            />
            {formState.errors.description && (
              <p className="text-red-500 text-sm">
                {formState.errors.description.join(", ")}
              </p>
            )}
            {formState.errors._form ? (<div className="p-2 rounded bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
            </div>):null}
            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}