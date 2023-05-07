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
                v-if="!screen.sm && !screen.md && !screen.lg"
                style="transform: scaleX(-1)"
                :name="'img:' + getAsset('revolver.png')"
              />

              Wanted
              <div v-if="screen.sm || screen.md || screen.lg" />

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
          <q-card-section>
            <div>
              <div class="text-body1">
                <div class="text-bold">Description:</div>
                {{ job.description }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-gutter-sm">
                <q-badge
                  :label="formatJobLevel(job.level)"
                  outline
                  color="white"
                  class="text-subtitle2 text-bold"
                />
                <q-badge
                  v-for="badge in job.requiredBadges"
                  :key="badge"
                  :label="formatBadgeName(badge)"
                  outline
                  :color="formatBadgeColor(badge)"
                  class="text-subtitle2 text-bold"
                />
              </div>
            </div>

            <template v-if="company && company.details.type === 'company'">
              <div class="text-h6 text-bold q-mt-sm q-mb-xs">Posted by:</div>
              <div @click="showDialog = true">
                <q-item class="bg-secondary cursor-pointer">
                  <q-item-section avatar>
                    <user-image size="55px" :user="company" />
                  </q-item-section>

                  <q-item-section class="text-primary">
                    <q-item-label>{{ company.details.name }}</q-item-label>
                    <q-item-label caption class="text-bold">
                      Sheriff
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <user-account-dialog
                v-model="showDialog"
                :user-id="job.companyId"
              />
            </template>
          </q-card-section>

          <q-card-actions class="row full-width">
            <div class="col-12">
              <q-btn
                class="fit"
                :label="user.jobIds.includes(job.id) ? 'Applied' : 'Apply'"
                color="secondary"
                :loading="loading"
                text-color="primary"
                :disable="user.jobIds.includes(job.id)"
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
import { formatJobLevel } from "common/lib/jobs";
import { formatBadgeColor } from "common/lib/quizzes";
import { formatBadgeName } from "common/lib/quizzes";
import type { Job } from "types/job";

import UserAccountDialog from "./user-account-dialog.vue";
import UserImage from "./user-image.vue";
import { updateDocument } from "@/lib/firestore";
import { arrayUnion } from "firebase/firestore/lite";

const { users } = useUsersStore();
const { user } = useAuthStore();
const { screen } = useQuasar();

const showDialog = ref(false);

const props = defineProps<{
  job: Job;
  flipped: boolean;
}>();

const company = computed(() => users.value.get(props.job.companyId));

const loading = ref(false);

async function submit() {
  if (user.value.jobIds.includes(props.job.id)) {
    return;
  }

  loading.value = true;

  await updateDocument("users", user.value.id, {
    jobIds: arrayUnion(props.job.id),
  });

  user.value.jobIds.push(props.job.id);

  somethingsGood("Successfully applied!");

  loading.value = false;
}
</script>
