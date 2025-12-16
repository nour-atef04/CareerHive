import styles from "./JobsList.module.css";
import JobItem from "./JobItem";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import { filterJobs } from "./filterJobs";

export default function JobsList({ setShowJob, keyword, page, setPage }) {
  const navigate = useNavigate();
  

  const pageSize = 8; // Jobs per page

  const { data, isLoading, isError, error, isFetching } = useJobs({
    page: 1,
    limit: 100, // Fetch more for filtering
  });

  if (isLoading) return <Loader className={styles["loader"]} />;
  if (isError) return <p>Error: {error.message}</p>;

  const jobs = data?.result?.jobs || [];

  // Filter jobs locally
  const filteredJobs = filterJobs(jobs, { keyword });

  // Paginate filtered jobs
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(start, start + pageSize);

  if (filteredJobs.length === 0) return <p>No jobs found.</p>;

  // console.log(filteredJobs);

  return (
    <>
      <div className={styles["list"]}>
        {paginatedJobs.map((job) => (
          <JobItem
            job={job}
            key={job._id}
            onClick={() => {
              setShowJob?.(true);
              navigate(`/jobs/${encodeURIComponent(job._id)}`, {
                state: { job },
              });
            }}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className={styles["pagination"]}>
        <Button
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          variant={page === 1 || isFetching ? "disabled" : "filled"}
        >
          Previous
        </Button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <Button
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          variant={page >= totalPages || isFetching ? "disabled" : "filled"}
        >
          Next
        </Button>
      </div>
    </>
  );
}
