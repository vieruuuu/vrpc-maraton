import type { User } from "types/users";
import { defineRefStore } from "./lib/defineRefStore";
import { newQuery, queryDocuments } from "@/lib/firestore";

export const useUsersStore = defineRefStore("users", () => {
  const users = ref(new Map<string, User>());

  async function fetchUsers() {
    users.value = await queryDocuments(newQuery("users"));
  }

  return {
    users,
    fetchUsers,
  };
});
