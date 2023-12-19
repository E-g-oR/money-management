import { pipe } from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray";
import { QueryDocumentSnapshot } from "firebase/firestore";

type TId = {
    id: string
}
export const normalizeData = <T extends TId>(docSnapshot: QueryDocumentSnapshot): T => ({
  id: docSnapshot.id,
  ...docSnapshot.data(),
}) as T;

export const normalizeDataArray = <T extends TId>(rawData: QueryDocumentSnapshot[]) =>
  pipe(rawData, A.map(normalizeData<T>));
