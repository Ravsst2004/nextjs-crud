"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";

const TaskForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="title"
            id="title"
            name="title"
            placeholder="title"
            defaultValue="Title 1"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            placeholder="Type your message here."
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          provident quo unde dolore aliquam sed in reprehenderit eum pariatur
          ipsum."
          />
        </div>
        <Button variant="default">Submit</Button>
      </form>
    </div>
  );
};

export default TaskForm;
