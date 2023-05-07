<template>
  <div>
    <q-card>
      Reward: {{ quiz.badgeReward }}

      <br />
      {{ quizResponse }}
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
        sunt bune
        {{
          JSON.stringify(quizSolution.answers) ===
          JSON.stringify(quizResponse.responses)
        }}

        <q-btn label="upload quiz" @click="uploadQuiz"></q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { addDocument, updateDocument } from "@/lib/firestore";
import type { QuizResponse } from "types/quiz-responses";
import type { QuizSolution } from "types/quiz-solutions";
import type { Quiz } from "types/quizzes";

const quiz = ref<Quiz>({
  id: "",
  badgeReward: "csharp",
  questions: [
    {
      optionA: 'System.out.println("Hello World");',
      optionB: 'print ("Hello World");',
      optionC: 'Console.WriteLine("Hello World");',
      optionD: 'cout << "Hello World";',
      question: 'What is a correct syntax to output "Hello World" in C#?',
    },
    {
      optionA: "Txt",
      optionB: "myString",
      optionC: "string",
      optionD: "str",
      question:
        "Which data type is used to create a variable that should store text?",
    },
    {
      optionA: "int x = 5;",
      optionB: "x = 5;",
      optionC: "double x = 5;",
      optionD: "num x = 5",
      question: "How do you create a variable with the numeric value 5?",
    },
    {
      optionA: "int x = 2.8D;",
      optionB: "int x = 2.8;",
      optionC: "double x = 2.8D;",
      optionD: "byte x = 2.8",
      question: "How do you create a variable with the floating number 2.8?",
    },
    {
      optionA: "Length",
      optionB: "length",
      optionC: "length()",
      optionD: "getLength()",
      question: "Which property can be used to find the length of a string?",
    },
    {
      optionA: "=",
      optionB: "<>",
      optionC: "==",
      optionD: "><",
      question: "Which operator can be used to compare two values?",
    },
    {
      optionA: "MyMethod()",
      optionB: "myMethod[]",
      optionC: "MyMethod.",
      optionD: "(MyMethod)",
      question: "How do you create a method in C#?",
    },
  ],
  quizSolutionId: "",
});

const quizResponse = ref<QuizResponse>({
  id: "",
  quizId: "",
  responses: ["C", "C", "A", "C", "A", "C", "A"],
  userId: "",
});

const quizSolution = ref<QuizSolution>({
  id: "",
  quizId: "",
  answers: ["C", "C", "A", "C", "A", "C", "A"],
});

async function uploadQuiz() {
  const quizId = await addDocument("quizzes", quiz.value);

  const quizSolutionId = await addDocument("quiz-solutions", {
    ...quizSolution.value,
    quizId,
  });

  await updateDocument("quizzes", quizId, {
    quizSolutionId,
  });

  somethingsGood("Gata");
}
</script>
