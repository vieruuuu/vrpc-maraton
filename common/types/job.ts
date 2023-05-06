import { z } from "zod";
import { QuizBadges } from "./quizzes";
import { Min1String } from "./utils";

export const JobLevels = ["junior", "intermediate", "senior"] as const;

export type JobLevel = (typeof JobLevels)[number];

export const JobPayments = [
  "<1000$",
  "1000$-1500$",
  "1500$-2000$",
  "2500$-3000$",
  "+3000$",
] as const;

export type JobPayment = (typeof JobPayments)[number];

export const Job = z.object({
  id: z.string(),

  companyId: z.string(),

  title: Min1String,
  description: Min1String,
  idealCandidate: Min1String,

  level: z.enum(JobLevels),

  requiredBadges: z.enum(QuizBadges).array(),

  payment: z.enum(JobPayments),
});

export type Job = z.infer<typeof Job>;
