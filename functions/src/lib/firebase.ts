import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  FieldPath,
  FieldValue,
  QuerySnapshot,
  getFirestore,
} from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import * as functions from "firebase-functions";
import { AuthData } from "firebase-functions/lib/common/providers/https";
import {
  CollectionKey,
  CollectionsMap,
  NewQueryReturn,
  addDocumentFunc,
  deleteDocumentFunc,
  getDocumentFunc,
  newQueryFunc,
  queryDocumentsFuncArray,
  setDocumentFunc,
  updateDocumentFunc,
} from "types/firebase";
import { User } from "types/users";

export const logger = functions.logger;

export const newFunction = functions.region("europe-central2");

export const app = initializeApp();

export const db = getFirestore(app);

export const storage = getStorage(app);

db.settings({
  ignoreUndefinedProperties: true,
});

export const auth = getAuth(app);

export async function currentUserData(
  auth?: AuthData,
  onlyVerified = true
): Promise<User> {
  if (!auth?.uid) {
    throw new functions.https.HttpsError("permission-denied", "No auth user");
  }

  if (onlyVerified && !auth.token.email_verified) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "User not verified"
    );
  }
  const userData = await getDocument("users", auth.uid);

  if (!userData) {
    throw new functions.https.HttpsError("permission-denied", "No auth user");
  }

  return userData;
}

export const addDocument: addDocumentFunc<FieldValue> = async (
  collection,
  data
) => {
  const docRef = await db.collection(collection).add(data);

  return docRef.id;
};

export const updateDocument: updateDocumentFunc<FieldValue> = async (
  collection,
  id,
  data
) => {
  await db.collection(collection).doc(id).update(data);
};

export const setDocument: setDocumentFunc = async (collection, id, data) => {
  await db.collection(collection).doc(id).set(data);
};

export const deleteDocument: deleteDocumentFunc = async (collection, id) => {
  await db.collection(collection).doc(id).delete();
};

export const getDocument: getDocumentFunc = async <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  collection: T,
  id: string
) => {
  const snap = await db.collection(collection).doc(id).get();
  const docData = snap.data();

  if (!docData) {
    return undefined;
  }

  return {
    ...(docData as G),
    id: snap.id,
  };
};

export const newQuery: newQueryFunc<FieldPath, QuerySnapshot> = <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  collection: T
) =>
  db.collection(collection) as NewQueryReturn<T, G, FieldPath, QuerySnapshot>;

export const queryDocuments: queryDocumentsFuncArray<
  FieldPath,
  QuerySnapshot
> = async <T extends CollectionKey, G extends CollectionsMap[T]>(
  query: NewQueryReturn<T, G, FieldPath, QuerySnapshot>
) => {
  const q = await query.get();

  if (q.empty) {
    return [];
  }

  return q.docs.map((snap) => ({
    ...(snap.data() as G),
    id: snap.id,
  }));
};
