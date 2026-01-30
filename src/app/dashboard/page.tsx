import { KabanBoard } from "@/components/pages/dashboard/kaban-board";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import parseJSON from "@/lib/parseJSON";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  // if user not logged in redirect to the sign in
  if (!session?.user) {
    redirect("/sign-in");
  }

  await connectDB();

  const board = await Board.findOne({ userId: session.user.id }).populate({
    path: "columns",
  });
  const finalBoard = parseJSON(board);
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">{board.name}</h1>
          <p className="text-gray-600">Track your job application</p>
        </div>
        <KabanBoard board={finalBoard} userId={session.user.id} />
      </div>
    </div>
  );
}
