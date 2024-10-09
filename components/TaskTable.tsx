"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TasksType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const TaskTable = () => {
  const [tasks, setTasks] = useState<TasksType[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch("/api/task");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const handleUpdateTaskStatus = async (
    taskId: number,
    completedStatus: boolean
  ) => {
    try {
      await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: completedStatus }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: completedStatus } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px] text-left px-4 py-2 font-semibold text-gray-700">
              Title
            </TableHead>
            <TableHead className="w-[65rem] text-left px-4 py-2 font-semibold text-gray-700">
              Description
            </TableHead>
            <TableHead className="text-left px-4 py-2 font-semibold text-gray-700">
              Status
            </TableHead>
            <TableHead className="text-left px-4 py-2 font-semibold text-gray-700">
              View
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium px-4 py-2 text-gray-900">
                {task.title}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700">
                {task.description}
              </TableCell>
              <TableCell className="px-4 py-2">
                <span
                  onClick={() =>
                    handleUpdateTaskStatus(task.id, !task.completed)
                  }
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full cursor-pointer  ${
                    task.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {task.completed ? "Completed" : "Not Completed"}
                </span>
              </TableCell>
              <TableCell className="px-4 py-2 space-x-2">
                <Link
                  href={`/task/${task.id}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
