"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

interface TaskFormProps {
  task?: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
  };
}

const TaskForm = ({ task }: TaskFormProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.title || !data.description) {
      setError("Please fill the field");
      return;
    }

    try {
      if (task) {
        const res = await fetch(`/api/task/${task.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(res);
      } else {
        const res = await fetch("/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(res);
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-destructive font-bold">{error}</h1>
        <div className="grid w-full gap-1.5">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            defaultValue={task?.title}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            name="description"
            id="description"
            placeholder="Type your message here."
            className="block w-full px-3 py-2 h-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            defaultValue={task?.description}
          />
        </div>
        <Button variant="default" type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
