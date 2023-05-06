import type { JobLevel } from "types/job";

export function formatJobLevel(level: JobLevel): string {
  switch (level) {
    case "junior":
      return "Junior";
    case "intermediate":
      return "Intermediate";
    case "senior":
      return "Senior";
  }
}
