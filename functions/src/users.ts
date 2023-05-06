import { UserRegister } from "types/users";
import { UnauthenticatedError } from "./lib/errors";
import { newFunction, setDocument } from "./lib/firebase";
import { User } from "types/users";

export const createUser = newFunction.https.onCall(async (data, { auth }) => {
  if (!auth) {
    throw UnauthenticatedError;
  }

  const user = UserRegister.parse(data);

  const userData: User = {
    id: auth.uid,
    email: user.email,

    registerDate: Date.now(),
    lastLogin: Date.now(),

    details: user.details,

    badges: [],

    pTestIds: [],
    pTestResponseIds: [],

    quizIds: [],
    quizResponseIds: [],

    jobIds: [],
    jobResponseIds: [],
  };

  await setDocument("users", auth.uid, userData);

  return userData;
});
