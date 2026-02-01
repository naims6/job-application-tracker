"use client";
import { Board } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,

  XCircle,
} from "lucide-react";
import DropplableColumn, { ColConfig } from "./droppable-column";

interface KanbanBoardProps {
  board: Board;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="w-4 h-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="w-4 h-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="w-4 h-4" />,
  },
];

export function KabanBoard({ board }: KanbanBoardProps) {
  const columns = board.columns;
   const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];
  return (
    <div>
      <div>
        {columns.map((col, key) => {
          const config = COLUMN_CONFIG[key] || {
            color: "bg-gray-500",
            icon: <Calendar className="h-4 w-4" />,
          };
          return (
            <DropplableColumn
              key={key}
              column={col}
              config={config}
              boardId={board._id}
              sortedColumns={sortedColumns}
            />
          );
        })}
      </div>
    </div>
  );
}
