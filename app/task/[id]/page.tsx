"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const route = useRouter();

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

  const handleDelete = async () => {
    try {
      await fetch(`/api/task/${task?.id}`, {
        method: "DELETE",
      });
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!loading && !task) {
    notFound();
  }

  return (
    <>
      {task && (
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
            <Link
              href={`/task/edit/${task?.id}`}
              className={buttonVariants({ variant: "default" })}
            >
              Edit
            </Link>
            <AlertDialog>
              <AlertDialogTrigger
                className={buttonVariants({ variant: "destructive" })}
              >
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your task
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailTask;
