import styles from "./JobsList.module.css";
import JobItem from "./JobItem";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import { filterJobs } from "./filterJobs";
import List from "../ui/List";
import { useMemo } from "react";

export default function JobsList({
  givenJobs,
  setShowJob,
  keyword,
  page = 1,
  setPage,
}) {
  const navigate = useNavigate();
  const pageSize = 8; // Jobs per page
  const shouldFetch = !givenJobs;

  const { data, isLoading, isError, error, isFetching } = useJobs({
    page: 1,
    limit: 1000, // Fetch more for filtering
    enabled: shouldFetch,
  });

  // Calculate jobs list
  const allJobs = useMemo(() => {
    return givenJobs || data?.result?.jobs || [];
  }, [givenJobs, data]);

  // Filter jobs locally only when keyword or jobs change
  const filteredJobs = useMemo(() => {
    return filterJobs(allJobs, { keyword });
  }, [allJobs, keyword]);

  // Paginate filtered jobs
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(start, start + pageSize);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <List
        items={paginatedJobs}
        className={styles["list"]}
        keyExtractor={(job) => job._id}
        emptyMessage="No jobs found."
        renderItem={(job) => (
          <JobItem
            job={job}
            onClick={() => {
              setShowJob?.(true);
              navigate(`/jobs/${job._id}`, { state: { job } });
            }}
          />
        )}
      />

      {/* Pagination controls */}
      {setPage && (
        <div className={styles["pagination"]} aria-label="Job list pagination">
          <Button
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            variant={page === 1 || isFetching ? "disabled" : "filled"}
            disabled={page === 1 || isFetching}
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
            disabled={page >= totalPages || isFetching}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
