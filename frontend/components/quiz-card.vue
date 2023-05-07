<template>
  <div>
    <q-card
      class="text-white"
      :class="{ ['bg-' + formatBadgeColor(quiz.badgeReward)]: true }"
    >
      <q-card-section>
        <div class="text-h6">
          Quiz
          <span class="text-bold">{{ formatBadgeName(quiz.badgeReward) }}</span>
        </div>
        <div class="text-subtitle2">
          Number of questions:{{ quiz.questions.length }}
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions>
        <q-space></q-space>
        <q-btn
          :disable="user.quizIds.includes(quiz.id)"
          flat
          @click="showDialog = true"
          >{{
            user.quizIds.includes(quiz.id) &&
            user.badges.includes(quiz.badgeReward)
              ? "PASSED"
              : user.quizIds.includes(quiz.id)
              ? "FAILED"
              : "ATTEMPT"
          }}</q-btn
        >
      </q-card-actions>
    </q-card>

    <quiz-dialog v-model="showDialog" :quiz-id="quiz.id" />
  </div>
</template>

<script setup lang="ts">
import type { Quiz } from "types/quizzes";
import QuizDialog from "./quiz-dialog.vue";

import { formatBadgeColor, formatBadgeName } from "common/lib/quizzes";

const props = defineProps<{
  quiz: Quiz;
}>();

const { user } = useAuthStore();

const showDialog = ref(false);
</script>
