"use server";

import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board, Column, JobApplication } from "@/lib/models";
import { revalidatePath } from "next/cache";

interface IJobApplication {
  company: string;
  position: string;
  location: string;
  salary: string;
  jobUrl: string;
  tags: string[];
  description: string;
  notes: string;
  boardId: string;
  columnId: string;
  userId: string;
}

export async function createJobApplication(data: IJobApplication) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const {
    company,
    position,
    boardId,
    columnId,
    location,
    salary,
    jobUrl,
    tags,
    description,
    notes,
  } = data;
  console.log({ columnId, boardId });

  if (!company || !position) {
    // todo: add column id and board id
    return { error: "Missing required fields" };
  }

  //   verify board ownership
  const board = await Board.findOne({ _id: boardId, userId: session.user.id });

  if (!board) {
    return { error: "Board not found" };
  }

  //   verify column belongs to board
  const column = await Column.findOne({ _id: columnId, boardId: boardId });

  if (!column) {
    return { error: "Column not found" };
  }

  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    company,
    position,
    boardId,
    columnId,
    userId: session.user.id,
    location,
    salary,
    jobUrl,
    tags: tags || [],
    description,
    notes,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}
