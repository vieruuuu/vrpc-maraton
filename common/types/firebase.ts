import { type User } from "types/users";
import type { Quiz } from "./quizzes";
import type { QuizResponse } from "./quiz-responses";
import type { QuizSolution } from "./quiz-solutions";

export type CollectionsMap = {
  users: User;
  quizzes: Quiz;
  "quiz-responses": QuizResponse;
  "quiz-solutions": QuizSolution;
};

export type CollectionKey = keyof CollectionsMap;

type ValueOrFieldValue<T extends CollectionKey, FieldValue> = {
  [key in keyof CollectionsMap[T]]: CollectionsMap[T][key] | FieldValue;
};

export type addDocumentFunc<FieldValue> = <T extends CollectionKey>(
  collection: T,
  data: ValueOrFieldValue<T, FieldValue>
) => Promise<string>;

export type updateDocumentFunc<FieldValue> = <T extends CollectionKey>(
  collection: T,
  id: string,
  data: Partial<ValueOrFieldValue<T, FieldValue>>
) => Promise<void>;

export type setDocumentFunc = <T extends CollectionKey>(
  collection: T,
  id: string,
  data: CollectionsMap[T]
) => Promise<void>;

export type deleteDocumentFunc = <T extends CollectionKey>(
  collection: T,
  id: string
) => Promise<void>;

export type getDocumentFunc = <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  collection: T,
  id: string
) => Promise<G | undefined>;

type WhereQueryValues<CFV> = {
  "<": CFV;
  "<=": CFV;
  "==": CFV;
  "!=": CFV;
  ">=": CFV;
  ">": CFV;
  "array-contains": CFV extends Array<infer A> ? A : never;
  in: CFV[];
  "not-in": CFV[];
  "array-contains-any": CFV extends Array<infer A> ? A[] : never;
};

type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "array-contains-any"
  | "not-in";

type OrderByDirection = "desc" | "asc";

type WhereQuery<
  T extends CollectionKey,
  G extends CollectionsMap[T],
  FieldPath,
  QuerySnapshot
> = <
  CF extends keyof G | FieldPath,
  CFV extends CF extends FieldPath
    ? string
    : G[CF extends FieldPath ? never : CF],
  F extends WhereFilterOp
>(
  field: CF,
  opStr: F,
  value: WhereQueryValues<CFV>[F]
) => NewQueryReturn<T, G, FieldPath, QuerySnapshot>;

export type NewQueryReturn<
  T extends CollectionKey,
  G extends CollectionsMap[T],
  FieldPath,
  QuerySnapshot
> = {
  where: WhereQuery<T, G, FieldPath, QuerySnapshot>;

  limit: (limit: number) => NewQueryReturn<T, G, FieldPath, QuerySnapshot>;

  limitToLast: (
    limit: number
  ) => NewQueryReturn<T, G, FieldPath, QuerySnapshot>;

  orderBy: (
    fieldPath: keyof G,
    directionStr: OrderByDirection
  ) => NewQueryReturn<T, G, FieldPath, QuerySnapshot>;

  get: () => Promise<QuerySnapshot>;

  // TODO: add more functions
};

export type newQueryFunc<FieldPath, QuerySnapshot> = <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  collection: T
) => NewQueryReturn<T, G, FieldPath, QuerySnapshot>;

export type queryDocumentsFuncMap<FieldPath, QuerySnapshot> = <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  query: NewQueryReturn<T, G, FieldPath, QuerySnapshot>
) => Promise<Map<string, G>>;

export type queryDocumentsFuncArray<FieldPath, QuerySnapshot> = <
  T extends CollectionKey,
  G extends CollectionsMap[T]
>(
  query: NewQueryReturn<T, G, FieldPath, QuerySnapshot>
) => Promise<G[]>;
