import supabase from "./supabase";

export async function insertJob(job) {
  console.log(job);
  const { data, error } = await supabase
    .from("jobs")
    .upsert(
      {
        external_job_id: job._id,
        title: job.title,
        company: job.owner?.companyName || null,
        location: job.owner?.locationAddress || null,
        description: job.descriptionBreakdown?.oneSentenceJobSummary || null,
        raw: job,
      },
      { onConflict: "external_job_id" },
    )
    .select("id")
    .single();

  if (error) throw new Error("Failed to add job.");

  return data.id;
}

export async function saveJob(job) {

//   const { data } = await supabase.auth.getSession();
//   console.log("AUTH SESSION:", data?.session);

  // ensure job exists and get id
  const jobId = await insertJob(job);

  const { error } = await supabase.from("saved_jobs").insert({ job_id: jobId });

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
