<template>
  <div>
    <div style="height: 400px">
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

        <q-card v-else class="full-height bg-secondary">
          <q-card-section>
            <div class="text-center text-h2 text-bold">Wanted</div>
            <div>
              {{ job.title }}
            </div>
          </q-card-section>

          <q-card-section> {{ job.description }} </q-card-section>

          <q-card-actions style="position: absolute; bottom: 0">
            <q-btn label="Apply" />
          </q-card-actions>
        </q-card>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from "types/job";

const props = defineProps<{
  job: Job;
  flipped: boolean;
}>();
</script>
