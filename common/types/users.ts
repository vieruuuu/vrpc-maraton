import { z } from "zod";

import { Email, Min1Int } from "./utils";
import { QuizBadges } from "./quizzes";

export const UserTypes = ["candidate", "company"] as const;

export type UserType = (typeof UserTypes)[number];

export const User = z.object({
  id: z.string(),
  email: Email,

  firstName: z.string().min(1),
  lastName: z.string().min(1),

  registerDate: Min1Int,
  lastLogin: Min1Int,

  type: z.enum(UserTypes),

  badges: z.enum(QuizBadges).array(),

  quizIds: z.string().array(),
  quizResponseIds: z.string().array(),

  pTestIds: z.string().array(),
  pTestResponseIds: z.string().array(),
});

export type User = z.infer<typeof User>;
