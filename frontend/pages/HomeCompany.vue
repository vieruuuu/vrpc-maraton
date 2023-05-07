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
        <div
          v-for="job in companyJobs.values()"
          :key="job.id"
          class="col-xs-12 col-sm-6 col-md-4 q-pa-md"
        >
          <q-card class="q-pa-md">
            <q-card-section>
              <div class="text-h4 text-center">Wanted</div>
              <div class="text-h6 text-center">
                {{ job.title }}
              </div>
            </q-card-section>

            <q-separator />

            <div v-if="candidates(job.id).size > 0" class="q-mb-md">
              <div v-for="u in candidates(job.id).values()" :key="u.id">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ formatUserName(u) }}</q-item-label>
                    <q-item-label caption
                      >{{ formatDate(u.lastLogin) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <div class="full-width row q-col-gutter-md justify-end">
                  <div class="col-4">
                    <q-btn
                      flat
                      color="black"
                      class="fit"
                      label="Profile"
                      no-caps
                    />
                  </div>
                  <div class="col-8">
                    z
                    <q-btn
                      outline
                      class="fit"
                      color="orange-10"
                      label="Place bounty"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-else>No cowboys intereseted in dthis pula</div>

            <q-separator />

            <q-card-actions>
              <q-btn
                class="col-12"
                label="Terminate Bounty"
                color="red"
                outline
              ></q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDate } from "common/lib/date";
import { filterMap } from "common/lib/maps";
import { formatUserName } from "common/lib/users";

import JobSubmit from "@@/job-submit.vue";

const { companyJobs } = useJobsStore();
const { users } = useUsersStore();

const candidates = (jobId: string) =>
  filterMap(
    users.value,
    ({ jobIds, details }) =>
      details.type === "candidate" && jobIds.includes(jobId)
  );
</script>
