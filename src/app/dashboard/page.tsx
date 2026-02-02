import { KabanBoard } from "@/components/pages/dashboard/kaban-board";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import parseJSON from "@/lib/parseJSON";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// async function getBoard(userId: string) {
//   "use cache";
//   await connectDB();

//   const boardDoc = await Board.findOne({ userId: userId }).populate({
//     path: "columns",
//     populate: {
//       path: "jobApplications",
//     },
//   });

//   const board = parseJSON(boardDoc);
//   return board;
// }

const getBoard = unstable_cache(
  async (userId: string) => {
    await connectDB();
    const board = await Board.findOne({ userId }).populate({
      path: "columns",
      populate: { path: "jobApplications" },
    });
    return parseJSON(board);
  },
  ["board"],
  { revalidate: 60 },
);

async function DashboardPage() {
  const session = await getSession();
  // if user not logged in redirect to the sign in
  if (!session?.user.id) {
    redirect("/sign-in");
  }
  const board = await getBoard(session?.user.id);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">{board.name}</h1>
          <p className="text-gray-600">Track your job application</p>
        </div>
        <KabanBoard board={board} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={"Loading..."}>
      <DashboardPage></DashboardPage>
    </Suspense>
  );
}
