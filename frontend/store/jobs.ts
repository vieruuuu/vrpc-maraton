import { defineRefStore } from "./lib/defineRefStore";
import { newQuery, queryDocuments } from "@/lib/firestore";
import { filterMap } from "common/lib/maps";
import type { Job } from "types/job";

export const useJobsStore = defineRefStore("jobs", () => {
  const { user } = useAuthStore();

  const jobs = ref(new Map<string, Job>());

  const myJobs = computed(() =>
    filterMap(jobs.value, ({ requiredBadges }) =>
      user.value.badges.some((b) => requiredBadges.includes(b))
    )
  );

  async function fetchJobs() {
    jobs.value = await queryDocuments(newQuery("jobs"));
  }

  return {
    jobs,
    myJobs,
    fetchJobs,
  };
});
