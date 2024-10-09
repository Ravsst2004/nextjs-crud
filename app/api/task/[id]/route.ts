import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const taskId = parseInt(params.id);

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/task", "layout");
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { message: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const taskId = parseInt(params.id);
  try {
    const deleteTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json(deleteTask, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const taskId = parseInt(params.id);
  try {
    const body = await request.json();
    const updateTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updateTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}
