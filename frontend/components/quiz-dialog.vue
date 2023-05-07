<template>
  <q-dialog
    v-if="quiz && quizSolution"
    v-model="showDialog"
    full-height
    full-width
    persistent
  >
    <q-card>
      <q-card-section>
        <div v-for="(q, i) in quiz.questions" :key="q.question + i">
          <div class="text-h6 text-bold">
            {{ q.question }}
          </div>

          <div>
            <div>
              <q-radio
                v-model="quizResponse.responses[i]"
                val="A"
                :label="q.optionA"
                class="text-body1"
              />
            </div>

            <div>
              <q-radio
                v-model="quizResponse.responses[i]"
                val="B"
                :label="q.optionB"
                class="text-body1"
              />
            </div>

            <div>
              <q-radio
                v-model="quizResponse.responses[i]"
                val="C"
                :label="q.optionC"
                class="text-body1"
              />
            </div>

            <div>
              <q-radio
                v-model="quizResponse.responses[i]"
                val="D"
                :label="q.optionD"
                class="text-body1"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn label="Submit quiz" @click="submitQuiz" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { updateDocument } from "@/lib/firestore";
import { arrayUnion } from "firebase/firestore/lite";
import type { QuizResponse } from "types/quiz-responses";

const quizResponse = ref<QuizResponse>({
  id: "",
  quizId: "",
  responses: [],
  userId: "",
});

const props = defineProps<{ quizId: string; modelValue: boolean }>();

const emit = defineEmits(["update:modelValue"]);

const showDialog = computed({
  set: (val) => emit("update:modelValue", val),
  get: () => props.modelValue,
});

const { quizzes, quizzesSolutions } = useQuizzesStore();
const { user } = useAuthStore();

const quiz = computed(() => quizzes.value.get(props.quizId));
const quizSolution = computed(() =>
  quiz.value ? quizzesSolutions.value.get(quiz.value.quizSolutionId) : undefined
);

async function submitQuiz() {
  if (!quiz.value || !quizSolution.value) {
    return;
  }

  const passedQuiz =
    JSON.stringify(quizSolution.value.answers) ===
    JSON.stringify(quizResponse.value.responses);

  if (passedQuiz) {
    await updateDocument("users", user.value.id, {
      badges: arrayUnion(quiz.value.badgeReward),
      quizIds: arrayUnion(quiz.value.id),
    });

    user.value.badges.push(quiz.value.badgeReward);

    somethingsGood("Congratulations! You earned a new badge!");
  } else {
    await updateDocument("users", user.value.id, {
      quizIds: arrayUnion(quiz.value.id),
    });

    somethingsWrong("You'll do better next time :(");
  }

  user.value.quizIds.push(quiz.value.id);

  showDialog.value = false;
}
</script>
