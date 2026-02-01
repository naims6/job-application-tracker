import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@/lib/models/models.types";
import { MoreVertical, Trash2 } from "lucide-react";
import CreateJobApplicationDialog from "./create-job-dialog";
import SortableJobCard from "./sortable-job-card";

export interface ColConfig {
  color: string;
  icon?: React.ReactNode;
}

export default function DropplableColumn({
  column,
  config,
  boardId,
  sortedColumns
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[]
}) {
  console.log(column.jobApplications);
  const sortedJobs = column.jobApplications?.sort((a, b) => a.order - b.order);
  return (
    <Card className="min-w-75 shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle>{column.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-100 rounded-b-lg">
        {sortedJobs.map((job, key) => (
          <SortableJobCard key={key} job={job} columns={sortedColumns} />
        ))}
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
      </CardContent>
    </Card>
  );
}
