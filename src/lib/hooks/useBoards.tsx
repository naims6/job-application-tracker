import { useEffect, useState } from "react";
import { Board, Column } from "../models/models.types";

export function useBoard(initialBoard: Board) {
  const [board, setBoard] = useState<Board | null>(null);
  const [columns, setColumns] = useState<Column[] | null>(
    initialBoard?.columns || null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setColumns(initialBoard.columns || []);
    }
  }, [initialBoard]);

  async function moveJob(
    JobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {}

  return { board, columns, error, moveJob };
}
