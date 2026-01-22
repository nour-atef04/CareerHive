import supabase from "./supabase";

export async function insertJob(job) {
  // try to find if job already exists
  const { data: existingJob } = await supabase
    .from("jobs")
    .select("id")
    .eq("external_job_id", job._id)
    .maybeSingle();

  // if exists -> return id
  if (existingJob) return existingJob.id;

  // if not -> insert it
  const { data: newJob, error: insertError } = await supabase
    .from("jobs")
    .insert({
      external_job_id: job._id,
      title: job.title,
      company: job.owner?.companyName || null,
      location: job.owner?.locationAddress || null,
      description: job.descriptionBreakdown?.oneSentenceJobSummary || null,
      raw: job,
    })
    .select("id")
    .single();

  if (insertError) {
    // handle race condition: if another user saved it at the exact same millisecond
    if (insertError.code === "23505") {
      const { data: retryJob } = await supabase
        .from("jobs")
        .select("id")
        .eq("external_job_id", job._id)
        .single();
      return retryJob.id;
    }
    throw new Error("Failed to add job.");
  }

  return newJob.id;
}

export async function saveJob(job) {
  const { data } = await supabase.auth.getSession();
  // console.log("AUTH SESSION:", data?.session.user.id);

  // ensure job exists and get id
  const jobId = await insertJob(job);

  // console.log(jobId);

  const { error } = await supabase
    .from("saved_jobs")
    .insert({ user_id: data?.session.user.id, job_id: jobId });

  if (error) {
    // ignore duplicate save (unique constraint)
    if (error.code === "23505") return { jobId, alreadySaved: true };
    throw new Error("Failed to save job.");
  }

  return { jobId, saved: true };
}

export async function unsaveJob(job) {
  const { data } = await supabase
    .from("jobs")
    .select("id")
    .eq("external_job_id", job._id)
    .single();

  await supabase.from("saved_jobs").delete().eq("job_id", data.id);
}

export async function getSavedJobs(userId) {
  const { data, error } = await supabase
    .from("saved_jobs")
    .select(`id, jobs(external_job_id)`)
    .eq("user_id", userId);

  // console.log(data);

  if (error) throw new Error("Failed to get saved jobs.");
  return data;
}
