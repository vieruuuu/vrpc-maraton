<template>
  <div>
    <div class="text-h4"></div>

    <div class="text-h5">
      You only have a limited number of bounties per day!
    </div>
    <div class="text-h5">Earn badges to see more bounties!</div>

    <q-btn
      :label="flipped ? 'Flip Bounties' : 'Check out your bounties!'"
      :disable="!flipped"
      @click="flipped = false"
    />

    <q-btn
      label="Shuffle cards"
      :loading="shuffling"
      :disable="shuffling"
      @click="shuffle"
    />

    <div class="row q-col-gutter-xl flex-center q-mt-xl">
      <transition-group name="flip-list">
        <candidate-job-card
          v-for="job in jobs"
          :key="job.id"
          class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"
          :job="job"
          :flipped="flipped"
          @click="shuffling ? null : (flipped = false)"
        />
      </transition-group>
    </div>

    <div class="text-h6">Do you want more bounties?</div>
    <div class="text-h6">Collect badges from quizzes!</div>
  </div>
</template>

<script setup lang="ts">
import CandidateJobCard from "@@/candidate-job-card.vue";
import type { Job } from "types/job";

const flipped = ref(true);
const shuffling = ref(false);

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomizeArray() {
  let moves = 100;

  jobs.value.sort(() => {
    if (moves === 0) {
      return 1;
    }

    moves--;

    return getRandomArbitrary(-50, 50);
  });
}

async function shuffle() {
  shuffling.value = true;

  if (!flipped.value) {
    flipped.value = true;

    await sleep(1500);
  }

  randomizeArray();

  shuffling.value = false;
}

const jobs = ref<Job[]>([
  {
    id: "1",
    description: "989823Test descriere1",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
  },
  {
    id: "2",
    description: "9123Test descriere2",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
  },
  {
    id: "3",
    description: "456Test descriere3",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
  },
  {
    id: "4",
    description: "13677Test descriere4",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
  },
  {
    id: "5",
    description: "4634Test descriere5",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
  },
  {
    id: "6",
    description: "4634Test descriere5",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
  },
  {
    id: "7",
    description: "4634Test descriere5",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
  },
]);
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
