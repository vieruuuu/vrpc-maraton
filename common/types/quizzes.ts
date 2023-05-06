import { z } from "zod";

export const QuizQuestion = z.object({
  question: z.string(),

  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string(),
  optionD: z.string(),
});

export type QuizQuestion = z.infer<typeof QuizQuestion>;

export const QuizBadges = [
  "typescript",
  "java",
  "php",
  "html",
  "css",
  "driving-license",
  "rust",
  "cpp",
  "c",
  "csharp",
] as const;

export type QuizBadge = (typeof QuizBadges)[number];

export const Quiz = z.object({
  id: z.string(),

  quizAnswerId: z.string(),

  questions: QuizQuestion.array(),

  badgeReward: z.enum(QuizBadges),
});

export type Quiz = z.infer<typeof Quiz>;
