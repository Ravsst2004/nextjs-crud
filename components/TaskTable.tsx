import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

export async function TaskTable() {
  const tasks = await prisma.task.findMany();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.completed ? "Completed" : "Pending"}</TableCell>
            <TableCell className="space-x-2">
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
  );
}
