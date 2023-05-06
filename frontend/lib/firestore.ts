import {
  type DocumentData,
  FieldPath,
  FieldValue,
  QueryConstraint,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import type {
  CollectionKey,
  CollectionsMap,
  NewQueryReturn,
  addDocumentFunc,
  deleteDocumentFunc,
  getDocumentFunc,
  newQueryFunc,
  queryDocumentsFuncMap,
  setDocumentFunc,
  updateDocumentFunc,
} from "types/firebase";

export const getDocument: getDocumentFunc = async <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  col: T,
  id: string
) => {
  const db = getFirestore();

  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return undefined;
  }

  return {
    ...(docSnap.data() as G),
    id,
  };
};

export const addDocument: addDocumentFunc<FieldValue> = async (col, data) => {
  const db = getFirestore();
  const colRef = collection(db, col);

  const docRef = await addDoc<DocumentData>(colRef, data);

  return docRef.id;
};

export const deleteDocument: deleteDocumentFunc = async (col, id) => {
  const db = getFirestore();

  const docRef = doc(db, col, id);

  await deleteDoc(docRef);
};

export const setDocument: setDocumentFunc = async (col, id, data) => {
  const db = getFirestore();

  const docRef = doc(db, col, id);

  await setDoc<DocumentData>(docRef, data);
};

export const updateDocument: updateDocumentFunc<FieldValue> = async (
  col,
  id,
  data
) => {
  const db = getFirestore();

  const docRef = doc(db, col, id);

  await updateDoc<DocumentData>(docRef, data);
};

export const newQuery: newQueryFunc<FieldPath, QuerySnapshot> = <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  col: T
): NewQueryReturn<T, G, FieldPath, QuerySnapshot> => {
  const db = getFirestore();
  const colRef = collection(db, col);

  const queries: QueryConstraint[] = [];

  return {
    get() {
      return getDocs(query(colRef, ...queries));
    },

    limit(n) {
      queries.push(limit(n));

      return this;
    },

    where(fieldPath, opStr, value) {
      queries.push(where(fieldPath as string | FieldPath, opStr, value));

      return this;
    },

    limitToLast(limit) {
      queries.push(limitToLast(limit));

      return this;
    },

    orderBy(fieldPath, directionStr) {
      queries.push(orderBy(fieldPath as string | FieldPath, directionStr));

      return this;
    },
  };
};

export const queryDocuments: queryDocumentsFuncMap<
  FieldPath,
  QuerySnapshot
> = async <T extends CollectionKey, G extends CollectionsMap[T]>(
  query: NewQueryReturn<T, G, FieldPath, QuerySnapshot>
) => {
  const snap = await query.get();

  const result = new Map<string, G>();

  for (const doc of snap.docs) {
    result.set(doc.id, {
      ...(doc.data() as G),
      id: doc.id,
    });
  }

  return result;
};
