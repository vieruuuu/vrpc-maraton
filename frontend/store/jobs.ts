import { defineRefStore } from "./lib/defineRefStore";
import { newQuery, queryDocuments } from "@/lib/firestore";
import { extractFromMap, filterMap } from "common/lib/maps";
import type { Job } from "types/job";

export const useJobsStore = defineRefStore("jobs", () => {
  const { user } = useAuthStore();

  const jobs = ref(new Map<string, Job>());

  const myJobs = computed(() =>
    filterMap(
      jobs.value,
      ({ requiredBadges, id }) =>
        user.value.badges.some((b) => requiredBadges.includes(b)) &&
        !user.value.jobIds.includes(id)
    )
  );

  const appliedJobs = computed(() =>
    extractFromMap(jobs.value, user.value.jobIds)
  );

  const companyJobs = computed(() =>
    filterMap(jobs.value, ({ companyId }) => user.value.id === companyId)
  );

  async function fetchJobs() {
    jobs.value = await queryDocuments(newQuery("jobs"));
  }

  return {
    jobs,
    appliedJobs,
    myJobs,
    companyJobs,
    fetchJobs,
  };
});
