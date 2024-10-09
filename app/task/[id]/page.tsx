"use client";

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
    <div>
      <h1>{task?.title}</h1>
      <p>{task?.description}</p>
      <p>Completed: {task?.completed ? "Yes" : "No"}</p>
    </div>
  );
};

export default DetailTask;
