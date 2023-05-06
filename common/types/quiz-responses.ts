import { z } from "zod";
import { QuizOptionNames } from "./quiz-solutions";

export const QuizResponse = z.object({
  id: z.string(),

  quizId: z.string(),
  // candidate's id
  userId: z.string(),

  responses: z.enum(QuizOptionNames).array(),
});

export type QuizResponse = z.infer<typeof QuizResponse>;
