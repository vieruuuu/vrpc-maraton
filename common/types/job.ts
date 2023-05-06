import { z } from "zod";

export const Job = z.object({
  id: z.string(),
});

export type Job = z.infer<typeof Job>;
