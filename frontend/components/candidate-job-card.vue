<template>
  <div>
    <div style="height: 500px">
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
                style="transform: scaleX(-1)"
                :name="'img:' + getAsset('revolver.png')"
              />
              Wanted
              <q-icon :name="'img:' + getAsset('revolver.png')" />
            </div>
            <div class="text-center text-h6">
              {{ job.title }}
            </div>
            <div class="text-center text-body1">
              Reward:<span class="text-orange-6 text-weight-bolder">{{
                job.reward
              }}</span>
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
                  :label="job.level"
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

            <div class="text-h6 text-bold q-mt-sm q-mb-xs">Posted by:</div>
            <q-item class="bg-secondary">
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section class="text-primary">
                <q-item-label>bytex</q-item-label>
                <q-item-label caption class="text-bold"> Company </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-actions
            style="position: absolute; bottom: 0"
            class="row full-width"
          >
            <div class="col-12">
              <q-btn
                class="fit"
                label="Apply"
                color="secondary"
                text-color="primary"
              />
            </div>
          </q-card-actions>
        </q-card>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from "types/job";
import { formatBadgeColor } from "common/lib/quizzes";
import { formatBadgeName } from "common/lib/quizzes";

const props = defineProps<{
  job: any;
  flipped: boolean;
}>();
</script>
