import { z } from "zod";

export const JobApplication = z.object({
  id: z.string(),

  jobId: z.string(),
});

export type JobApplication = z.infer<typeof JobApplication>;
