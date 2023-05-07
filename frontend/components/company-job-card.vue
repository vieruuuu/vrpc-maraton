<template>
  <div class="full-height">
    <div style="min-height: 500px">
      <transition
        appear
        mode="out-in"
        enter-active-class="animated flipInY slower"
      >
        <div v-if="flipped" class="full-height cursor-pointer">
          <q-img
            fit="scale-down"
            class="fit"
            :src="getAsset('card-back.png')"
          />
        </div>

        <q-card v-else class="full-height bg-primary text-white">
          <q-card-section class="bg-secondary text-primary">
            <div class="text-center text-h3 text-bold">
              <q-icon
                v-if="!screen.xs && !screen.sm && !screen.md && !screen.lg"
                style="transform: scaleX(-1)"
                :name="'img:' + getAsset('revolver.png')"
              />

              Wanted
              <div v-if="screen.xs || screen.sm || screen.md || screen.lg" />

              <q-icon :name="'img:' + getAsset('revolver.png')" />
            </div>
            <div class="text-center text-h6">
              {{ job.title }}
            </div>
            <div class="text-center text-body1">
              Reward:
              <span class="text-orange-6 text-weight-bolder">
                {{ job.payment }}
              </span>
            </div>
          </q-card-section>

          <q-card-section v-if="candidates(job.id).size > 0">
            <candidate-item
              v-for="c in candidates(job.id).values()"
              :key="c.id"
              :user="c"
              @click="showDialog = true"
            />
          </q-card-section>
          <q-card-section v-else class="text-body1 text-center">
            <div>No cowboys interested for now...</div>
            <div>Check later!</div>
          </q-card-section>

          <q-card-actions class="row full-width">
            <div class="col-12">
              <q-btn
                class="fit"
                label="Unlist bounty"
                color="secondary"
                :loading="loading"
                text-color="negative"
                @click="submit"
              />
            </div>
          </q-card-actions>
        </q-card>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { filterMap } from "common/lib/maps";
import type { Job } from "types/job";

import { deleteDocument } from "@/lib/firestore";

import CandidateItem from "./candidate-item.vue";

const { jobs } = useJobsStore();
const { users } = useUsersStore();
const { screen } = useQuasar();

const showDialog = ref(false);

const props = defineProps<{
  job: Job;
  flipped: boolean;
}>();

const loading = ref(false);

const candidates = (jobId: string) =>
  filterMap(
    users.value,
    ({ jobIds, details }) =>
      details.type === "candidate" && jobIds.includes(jobId)
  );

async function submit() {
  loading.value = true;

  await deleteDocument("jobs", props.job.id);

  jobs.value.delete(props.job.id);

  somethingsGood("Successfully unlisted!");

  loading.value = false;
}
</script>
