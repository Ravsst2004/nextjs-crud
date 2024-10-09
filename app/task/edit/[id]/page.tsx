"use client";

import TaskForm from "@/components/TaskForm";
import React, { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

interface TasksType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const EditTaskPage = ({ params }: Props) => {
  const [tasks, setTasks] = useState<TasksType>();
  const taskid = parseInt(params.id);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch(`/api/task/${taskid}`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, [taskid]);
  return (
    <div>
      <TaskForm task={tasks} />
    </div>
  );
};

export default EditTaskPage;
