import { defineRefStore } from "./lib/defineRefStore";
import { newQuery, queryDocuments } from "@/lib/firestore";
import type { Job } from "types/job";

export const useJobsStore = defineRefStore("users", () => {
  const jobs = ref(new Map<string, Job>());

  async function fetchJobs() {
    jobs.value = await queryDocuments(newQuery("jobs"));
  }

  return {
    jobs,
    fetchJobs,
  };
});
