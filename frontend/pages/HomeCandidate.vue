<template>
  <div>
    <template v-if="user.badges.length > 0">
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
            v-for="job in myJobs.values()"
            :key="job.id"
            class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 full-height"
            :job="job"
            :flipped="flipped"
            @click="shuffling ? null : (flipped = false)"
          />
        </transition-group>
      </div>
    </template>

    <div class="q-my-xl">
      <div class="text-h4">
        {{
          user.badges.length > 0 ? "Wanna earn some badges?" : "No badges yet!"
        }}
      </div>
      <div class="text-h5 q-mt-md">Solve some quizzes</div>
    </div>

    <div class="row q-col-gutter-md">
      <quiz-card
        v-for="quiz in quizzes.values()"
        :key="quiz.id"
        :quiz="quiz"
        class="col-xs-12 col-sm-4 col-md-3 col-lg-3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CandidateJobCard from "@@/candidate-job-card.vue";

import QuizCard from "@@/quiz-card.vue";

const flipped = ref(true);
const shuffling = ref(false);

const { user } = useAuthStore();
const { myJobs } = useJobsStore();
const { quizzes } = useQuizzesStore();

function randomizeArray() {
  const moves = 100;

  // jobs.value.sort(() => {
  //   if (moves === 0) {
  //     return 1;
  //   }

  //   moves--;

  //   return getRandomArbitrary(-50, 50);
  // });
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
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
