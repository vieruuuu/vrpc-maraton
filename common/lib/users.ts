import type { User } from "types/users";

export function formatUserName({ details }: User): string {
  if (details.type === "candidate") {
    return details.firstName + " " + details.lastName;
  }

  return details.name;
}
