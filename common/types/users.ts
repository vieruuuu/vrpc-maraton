import { z } from "zod";

import { Email, Min1Int } from "./utils";
import { QuizBadges } from "./quizzes";

export const UserTypes = ["candidate", "company"] as const;

export type UserType = (typeof UserTypes)[number];

export const UserCandidate = z.object({
  type: z.literal("candidate"),

  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export type UserCandidate = z.infer<typeof UserCandidate>;

export const UserCompany = z.object({
  type: z.literal("company"),

  name: z.string().min(1),
});

export type UserCompany = z.infer<typeof UserCompany>;

export const User = z.object({
  id: z.string(),
  email: Email,

  details: z.discriminatedUnion("type", [UserCandidate, UserCompany]),

  registerDate: Min1Int,
  lastLogin: Min1Int,

  badges: z.enum(QuizBadges).array(),

  quizIds: z.string().array(),
  quizResponseIds: z.string().array(),

  pTestIds: z.string().array(),
  pTestResponseIds: z.string().array(),

  jobIds: z.string().array(),
  jobResponseIds: z.string().array(),
});

export type User = z.infer<typeof User>;

export const UserRegister = User.pick({
  id: true,
  email: true,

  details: true,
});

export type UserRegister = z.infer<typeof UserRegister>;
