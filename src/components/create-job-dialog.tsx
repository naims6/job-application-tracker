"use client";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

interface IJobApplication {
  company: string;
  position: string;
  location: string;
  salary: string;
  jobUrl: string;
  tags: string[];
  description: string;
  notes: string;
}

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  console.log({ columnId, boardId });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobApplication>();

  const onSubmit = (data: IJobApplication) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus /> Plus
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex justify-start">
          <DialogTitle>Add Job Application</DialogTitle>
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
            >
              Add Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
