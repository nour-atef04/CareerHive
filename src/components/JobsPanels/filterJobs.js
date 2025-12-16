export function filterJobs(
  jobs,
  { keyword = "", location = "", workModel = "" }
) {
  const keywordLower = keyword.toLowerCase();
  const locationLower = location.toLowerCase();
  const workModelLower = workModel.toLowerCase();

  return jobs.filter((job) => {
    // keyword match in title, keywords or skills
    const keywordMatch =
      keyword === "" ||
      job.title?.toLowerCase().includes(keywordLower) ||
      job.descriptionBreakdown?.keywords?.some((k) =>
        k.toLowerCase().includes(keywordLower)
      ) ||
      job.keywords?.some((k) => k.toLowerCase().includes(keywordLower)) ||
      job.descriptionBreakdown?.skillRequirements?.some((s) =>
        s.toLowerCase().includes(keywordLower)
      ) ||
      job.skillRequirements?.some((s) =>
        s.toLowerCase().includes(keywordLower)
      );

    // location match
    const locationMatch =
      location === "" ||
      job.locationAddress?.toLowerCase().includes(locationLower) ||
      job.location?.toLowerCase().includes(locationLower) ||
      job.owner?.locationAddress?.toLowerCase().includes(locationLower) ||
      job.owner?.location?.toLowerCase().includes(locationLower);

    // work model match
    const workModelMatch =
      workModel === "" || job.type?.toLowerCase().includes(workModelLower);

    return keywordMatch && locationMatch && workModelMatch;
  });
}
