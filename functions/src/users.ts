import { UserRegister } from "types/users";
import { UnauthenticatedError } from "./lib/errors";
import { newFunction, setDocument } from "./lib/firebase";

export const createUser = newFunction.https.onCall(async (data, { auth }) => {
  if (!auth) {
    throw UnauthenticatedError;
  }

  const user = UserRegister.parse(data);

  const userData = {
    id: auth.uid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,

    registerDate: Date.now(),
    lastLogin: Date.now(),

    type: user.type,

    badges: [],
    quizIds: [],
    quizResponseIds: [],
    pTestIds: [],
    pTestResponseIds: [],
  };

  await setDocument("users", auth.uid, userData);

  return userData;
});
