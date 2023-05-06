<template>
  <div>
    <div class="text-h4">Howdy Cowboy!</div>
    <span class="text-body1">Happy hunting!</span>

    <q-btn label="Go to quizze s" to="/quizzes" />

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
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "TS developer",
    requiredBadges: ["javascript", "cpp"],
    idealCandidate: "",
    level: "junior",
    payment: "<1000$",
    companyId: "",
  },
  {
    id: "2",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "PHP developer",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    payment: "1000$-1500$",
    companyId: "",
  },
  {
    id: "3",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "CSS developer",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    payment: "2500$-3000$",
    companyId: "",
  },
  {
    id: "4",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "Web Designer",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    payment: "+3000$",
    companyId: "",
  },
  {
    id: "5",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "Back end senior dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    payment: "1000$-1500$",
    companyId: "",
  },
  {
    id: "6",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    payment: "2500$-3000$",
    companyId: "",
  },
  {
    id: "7",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    payment: "1000$-1500$",
    companyId: "",
  },
]);
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
