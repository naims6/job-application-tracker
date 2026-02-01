import { Column, JobApplication } from "@/lib/models/models.types";
import JobApplicationCard from "./job-application-card";
import { updateJobApplication } from "@/app/actions/job-applications";

export default function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
}
