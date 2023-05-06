<template>
  <div>
    <div>
      <div class="text-h4">Howdy Cowboy!</div>
      <span class="text-body1">Happy hunting!</span>
    </div>

    <div class="row q-col-gutter-md flex-center">
      <div>
        <q-btn
          color="green"
          outline
          :label="flipped ? 'Flip Bounties' : 'Check out your bounties!'"
          :disable="!flipped"
          @click="flipped = false"
        />
      </div>

      <div>
        <q-btn
          flat
          label="Shuffle cards"
          :loading="shuffling"
          :disable="shuffling"
          @click="shuffle"
        />
      </div>
    </div>

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

    <div class="q-my-xl">
      <div class="text-h4">Wanna earn some badges?</div>
      <div class="text-body1">Solve some quizzes</div>
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="quiz in quizzes"
        :key="quiz.id"
        class="col-xs-12 col-sm-4 col-md-3 col-lg-3"
      >
        <q-card
          class="my-card text-white"
          :class="{ ['bg-' + formatBadgeColor(quiz.badgeReward)]: true }"
        >
          <q-card-section>
            <div class="text-h6">
              Quiz
              <span class="text-bold">{{
                formatBadgeName(quiz.badgeReward)
              }}</span>
            </div>
            <div class="text-subtitle2">
              Number of questions:{{ quiz.questions.length }}
            </div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-actions>
            <q-space></q-space>
            <q-btn flat>Attempt</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { newQuery, queryDocuments } from "@/lib/firestore";
import CandidateJobCard from "@@/candidate-job-card.vue";
import { formatBadgeColor, formatBadgeName } from "common/lib/quizzes";
import type { Job } from "types/job";
import type { Quiz } from "types/quizzes";

const flipped = ref(true);
const shuffling = ref(false);

const quizDisabled = ref(true);

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

const jobs = ref<any[]>([
  {
    id: "1",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "TS developer",
    requiredBadges: [
      "javascript",
      "typescript",
      "java",
      "php",
      "html",
      "css",
      "driving-license",
      "rust",
      "cpp",
      "c",
      "csharp",
    ],
    idealCandidate: "",
    level: "junior",
    reward: "1000-5000$",
  },
  {
    id: "2",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "PHP developer",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    reward: "1000-2000$",
  },
  {
    id: "3",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "CSS developer",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    reward: "300-400$",
  },
  {
    id: "4",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "Web Designer",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    reward: "700-800$",
  },
  {
    id: "5",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "Back end senior dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    reward: "3000-3500$",
  },
  {
    id: "6",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "Caut TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    reward: "1000-1500$",
  },
  {
    id: "7",
    description:
      "Looking for a top notch front end dev to develop an restaurant presentation app",
    title: "TS Dev",
    requiredBadges: ["typescript"],
    idealCandidate: "",
    level: "junior",
    reward: "3000-4000$",
  },
]);

const quizzes = ref<Quiz[]>([]);

queryDocuments(newQuery("quizzes")).then(
  (q) => (quizzes.value = [...q.values()])
);
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
