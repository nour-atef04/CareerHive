import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useJobs({
  page = 1,
  limit = 8,
  sort = "desc",
  sortedBy = "createdAt",
  jobLoc = "",
  includeDescription = true,
  isTrending = false,
}) {
  const queryKey = [
    "jobs",
    page,
    limit,
    sort,
    sortedBy,
    jobLoc,
    includeDescription,
    isTrending,
  ];
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      // Construct URL Search Parameters dynamically
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      params.append("sort", sort);
      params.append("sortedBy", sortedBy);

      // Only include jobLoc if it has a value
      if (jobLoc) {
        params.append("jobLoc", jobLoc);
      }

      // Convert boolean to string "true" or "false"
      params.append("includeDescription", includeDescription.toString());
      params.append("isTrending", isTrending.toString());

      const url = `https://api.joinrise.io/api/v1/jobs/public?${params.toString()}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch jobs (Status: ${res.status})`);
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // data is considered fresh for 5 minutes
  });
}

// curl --location 'https://api.joinrise.io/api/v1/jobs/public?limit=20&sortedBy=createdAt&sort=des&page=1'

export function useJobDetails() {
  const { jobId } = useParams();

  const { data, isLoading, error } = useJobs({
    keywords: "",
    location: "",
    page: 1,
    limit: 100,
  });

  const jobs = data?.result?.jobs ?? [];
  console.log("JOBS", jobs);

  // Find the specific job using the ID from the URL params
  const job = jobs.find((j) => j._id === jobId);

  return { job, isLoading, error };
}
