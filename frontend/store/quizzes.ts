import type { Quiz } from "types/quizzes";
import { defineRefStore } from "./lib/defineRefStore";
import { newQuery, queryDocuments } from "@/lib/firestore";
import type { QuizSolution } from "types/quiz-solutions";

export const useQuizzesStore = defineRefStore("quizzes", () => {
  const quizzes = ref(new Map<string, Quiz>());
  const quizzesSolutions = ref(new Map<string, QuizSolution>());

  async function fetchQuizzes() {
    quizzes.value = await queryDocuments(newQuery("quizzes"));

    quizzesSolutions.value = await queryDocuments(newQuery("quiz-solutions"));
  }

  return {
    quizzes,
    quizzesSolutions,
    fetchQuizzes,
  };
});
