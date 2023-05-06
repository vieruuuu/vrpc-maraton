import { z } from "zod";

export const PTest = z.object({
  id: z.string(),
});

export type PTest = z.infer<typeof PTest>;
