import prisma from "@/prisma/db";
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
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { message: "Failed to fetch task" },
      { status: 500 }
    );
  }
}
