import { klona } from "klona";
import { LocalStorage } from "quasar";
import type { User } from "types/users";

import { defineRefStore } from "./lib/defineRefStore";

import { signOut as firebaseSignOut } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { router } from "@/router";

const initialUserState: User = {
  id: "",
  email: "",

  details: {
    type: "candidate",

    firstName: "",
    lastName: "",
  },

  lastLogin: 0,
  registerDate: 0,

  badges: [],

  pTestIds: [],
  pTestResponseIds: [],

  quizIds: [],
  quizResponseIds: [],

  jobIds: [],
  jobResponseIds: [],
};

export const useAuthStore = defineRefStore("auth", () => {
  const user = ref<User>(klona(initialUserState));

  const enableLoginHook = ref(true);

  const userSaved = ref(!!LocalStorage.getItem<boolean>("userSaved"));
  const userLogged = ref(false);

  function setAuth(value: boolean) {
    LocalStorage.set("userSaved", value);
    userSaved.value = value;
  }

  function setUser(passedUser?: User) {
    const userExists = !!passedUser;

    if (userExists) {
      user.value = passedUser;
    } else {
      user.value = klona(initialUserState);
    }

    userLogged.value = userExists;

    setAuth(userExists);
  }

  async function signOut() {
    await firebaseSignOut(firebaseAuth);

    setUser();

    router.push("/login");
  }

  return {
    user,
    userSaved,
    userLogged,
    setUser,
    enableLoginHook,
    signOut,
  };
});
