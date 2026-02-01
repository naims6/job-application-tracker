import {
  deleteJobApplication,
  updateJobApplication,
} from "@/app/actions/job-applications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Column, JobApplication } from "@/lib/models/models.types";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IJobApplication {
  company: string;
  position: string;
  location: string;
  salary: string;
  jobUrl: string;
  tags: string;
  description: string;
  notes: string;
  userId: string;
}

export default function JobApplicationCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IJobApplication>({
    defaultValues: {
      company: job.company || "",
      position: job.position,
      location: job.location || "",
      salary: job.salary || "",
      jobUrl: job.jobUrl || "",
      tags: job?.tags?.join(", ") || "",
      description: job.description || "",
      notes: job.notes || "",
    },
  });

  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job._id);
      if (result.error) {
        console.log("Failed to delete job application:", result.error);
      }
    } catch (err) {
      console.log("Failed to move job application", err);
    }
  }
  async function handleMove(newColumnId: string) {
    try {
      await updateJobApplication(job._id, {
        columnId: newColumnId,
      });
    } catch (err) {
      console.log("Failed to move job application", err);
    }
  }

  const onSubmit = async (data: IJobApplication) => {
    try {
      const result = await updateJobApplication(job._id, {
        ...data,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (!result.error) {
        setIsEditing(false);
      }
    } catch (err) {
      console.log("Failed to move job application", err);
    }
  };
  return (
    <>
      <Card className="cursor-pointer transition-shadow hover:shadow-lg bg-white group shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">{job.position}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {job.company}
              </p>
              {job.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {job.description}
                </p>
              )}
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="flex items-start gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((column, key) => (
                          <DropdownMenuItem
                            key={key}
                            onClick={() => handleMove(column._id)}
                          >
                            Move to {column.name}
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDelete()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* edit job */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader className="flex justify-start">
            <DialogTitle>Edit Job Application</DialogTitle>
            <DialogDescription>Track a new job application</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* company name and position */}
            <div className="space-y-4">
              <div className="flex justify-between gap-3">
                {/*company name */}
                <div className="space-y-2 flex-1">
                  <Label htmlFor="company" className="text-gray-700">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Company Name"
                    {...register("company", {
                      required: "Company Name is required.",
                    })}
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  {errors.company && (
                    <p className="text-red-500 font-medium">
                      {errors.company.message}
                    </p>
                  )}
                </div>
                {/*Position */}
                <div className="space-y-2 flex-1">
                  <Label htmlFor="position" className="text-gray-700">
                    Position *
                  </Label>
                  <Input
                    id="position"
                    type="text"
                    placeholder="Position"
                    {...register("position", {
                      required: "Position is required.",
                    })}
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  {errors.position && (
                    <p className="text-red-500 font-medium">
                      {errors.position.message}
                    </p>
                  )}
                </div>
              </div>
              {/* location and salary */}
              <div className="flex justify-between gap-3">
                {/*salary */}
                <div className="space-y-2 flex-1">
                  <Label htmlFor="company" className="text-gray-700">
                    Salary
                  </Label>
                  <Input
                    type="text"
                    placeholder="Salary"
                    {...register("salary")}
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                {/*location */}
                <div className="space-y-2 flex-1">
                  <Label htmlFor="location" className="text-gray-700">
                    Location
                  </Label>
                  <Input
                    type="text"
                    placeholder="Location"
                    {...register("location")}
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>
            {/* job url and tags */}
            <div className="mt-4 space-y-4">
              {/*Job url */}
              <div className="space-y-2 flex-1">
                <Label htmlFor="jobUrl" className="text-gray-700">
                  Job URL
                </Label>
                <Input
                  type="text"
                  placeholder="https://..."
                  {...register("jobUrl")}
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              {/*Tags  */}
              <div className="space-y-2 flex-1">
                <Label htmlFor="tags" className="text-gray-700">
                  Tags (comma-separated)
                </Label>
                <Input
                  type="text"
                  placeholder="React, Tailwind, Js"
                  {...register("tags")}
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            {/* description and notes */}
            <div className="mt-4 space-y-4">
              {/*description */}
              <div className="space-y-2 flex-1">
                <Label htmlFor="description" className="text-gray-700">
                  Description
                </Label>
                <Input
                  type="text"
                  placeholder="Description"
                  {...register("description")}
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              {/*notes  */}
              <div className="space-y-2 flex-1">
                <Label htmlFor="tags" className="text-gray-700">
                  Notes
                </Label>
                <Textarea
                  rows={3}
                  {...register("notes")}
                  placeholder="Notes about job"
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2 p-0 mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className="px-8 cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant={"default"}
                className="px-6 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
