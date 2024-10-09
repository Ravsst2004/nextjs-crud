"use client";

import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const DetailTask = ({ params }: Props) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTaskById = async () => {
      try {
        const res = await fetch(`/api/task/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setTask(data);
        } else {
          setTask(null);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    getTaskById();
  }, [params.id]);

  if (!loading && !task) {
    notFound();
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-6  bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">{task?.title}</h1>
        <p className="text-sm text-gray-500">
          Created at:
          {task?.createdAt
            ? new Date(task.createdAt).toLocaleDateString()
            : "Date not available"}
        </p>
        <p className="text-base text-gray-700">{task?.description}</p>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              task?.completed
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {task?.completed ? "Completed" : "Not Completed"}
          </span>
        </div>
      </div>
      <div className="mt-4 space-x-2">
        <Button>Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  );
};

export default DetailTask;
