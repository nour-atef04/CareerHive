import { useParams } from "react-router-dom";
import { useJobs } from "./useJobs";

export function useJobDetails() {
  const { jobId } = useParams();

  const { data, isLoading, error } = useJobs({
    keywords: "",
    location: "",
    page: 1,
    limit: 100,
  });

  const jobs = data.result.jobs || [];
  // console.log("JOBS" , jobs);

  // Find the specific job using the ID from the URL params
  const job = jobs.find((j) => j._id === jobId);

  return { job, isLoading, error };
}
