import { httpsCallable } from "firebase/functions";
import type { User, UserRegister } from "types/users";

import { firebaseFunctions } from "./firebase";

export const createUser = httpsCallable<UserRegister, User>(
  firebaseFunctions,
  "createUser"
);
