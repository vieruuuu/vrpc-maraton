import { z } from "zod";

export const QuizOptionNames = ["A", "B", "C", "D"] as const;

export type QuizOptionName = (typeof QuizOptionNames)[number];

export const QuizSolution = z.object({
  id: z.string(),

  quizId: z.string(),

  answers: z.enum(QuizOptionNames).array(),
});

export type QuizSolution = z.infer<typeof QuizSolution>;
