import type { Quiz } from "types/quizzes";
import { defineRefStore } from "./lib/defineRefStore";
import { newQuery, queryDocuments } from "@/lib/firestore";

export const useJobsStore = defineRefStore("users", () => {
  const quizzes = ref(new Map<string, Quiz>());

  async function fetchQuizzes() {
    quizzes.value = await queryDocuments(newQuery("quizzes"));
  }

  return {
    quizzes,
    fetchQuizzes,
  };
});
