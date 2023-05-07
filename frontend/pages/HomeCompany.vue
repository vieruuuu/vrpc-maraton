<template>
  <div class="q-ma-lg">
    <div class="flex-center row">
      <div class="q-my-lg col-12">
        <div class="text-h4">Howdy Sherif!</div>
        <div class="text-body1">Happy to see you searching for talents</div>
      </div>
      <div class="col-12 row justify-center">
        <job-submit />
      </div>
    </div>

    <div class="text-h4 q-mb-md">Your bounties:</div>
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <company-job-card
          v-for="job in companyJobs.values()"
          :key="job.id"
          class="col-xs-12 col-sm-6 col-md-4 q-pa-md"
          :job="job"
          :flipped="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CompanyJobCard from "@@/company-job-card.vue";

import JobSubmit from "@@/job-submit.vue";

const { companyJobs } = useJobsStore();
</script>
