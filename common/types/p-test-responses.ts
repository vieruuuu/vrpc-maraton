import { z } from "zod";

export const PTestResponse = z.object({
  id: z.string(),

  pTestId: z.string(),
  userId: z.string(),
});

export type PTestResponse = z.infer<typeof PTestResponse>;
