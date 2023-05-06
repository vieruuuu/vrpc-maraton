import type { FirestoreCollection } from "types/collections";
import { firestore } from "./firebase";

import {
  doc,
  getDoc,
  collection as firestoreCollection,
  query,
  getDocs,
  QueryConstraint,
  getCount,
} from "firebase/firestore/lite";

export async function fetchDocument<
  T extends keyof FirestoreCollection,
  G extends FirestoreCollection[T]
>(collection: T, id: string): Promise<G | undefined> {
  const docRef = doc(firestore, collection, id);
  const snap = await getDoc(docRef);

  const data = snap.data() as G;

  if (!data) {
    return undefined;
  }

  return {
    ...data,
    id: snap.id,
  };
}

export async function queryDocuments<
  T extends keyof FirestoreCollection,
  G extends FirestoreCollection[T]
>(collection: T, queries: QueryConstraint[]): Promise<G[]> {
  const collectionRef = firestoreCollection(firestore, collection);

  const q = query(collectionRef, ...queries);

  const snaps = await getDocs(q);

  const docs: G[] = [];

  snaps.forEach((docSnap) => {
    if (docSnap.exists()) {
      docs.push({
        ...(docSnap.data() as G),
        id: docSnap.id,
      });
    }
  });

  return docs;
}

export async function queryDocumentsCount<T extends keyof FirestoreCollection>(
  collection: T,
  queries: QueryConstraint[]
): Promise<number> {
  const collectionRef = firestoreCollection(firestore, collection);

  const q = query(collectionRef, ...queries);

  const snap = await getCount(q);

  return snap.data().count;
}
