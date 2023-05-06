import { z } from "zod";
import { QuizBadges } from "./quizzes";
import { Min1String } from "./utils";

export const JobLevels = ["junior", "intermediate", "senior"] as const;

export type JobLevel = (typeof JobLevels)[number];

export const Job = z.object({
  id: z.string(),

  title: Min1String,
  description: Min1String,
  idealCandidate: Min1String,

  level: z.enum(JobLevels),

  requiredBadges: z.enum(QuizBadges).array(),
});

export type Job = z.infer<typeof Job>;
