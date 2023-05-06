import { z } from "zod";
import { QuizBadges } from "./quizzes";

export const Job = z.object({
  id: z.string(),

  title: z.string(),

  description: z.string(),

  requiredBadges: z.enum(QuizBadges).array(),
});

export type Job = z.infer<typeof Job>;
