import { httpsCallable } from "firebase/functions";
import type { User } from "types/users";

import { firebaseFunctions } from "./firebase";

export const createUser = httpsCallable<User, void>(
  firebaseFunctions,
  "createUser"
);
