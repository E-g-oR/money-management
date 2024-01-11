import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { normalizeData, normalizeDataArray, TId } from "./utils/normalizeData";

type TUId = {
  user_id: string;
};

export type TCreatedAt = {
  created_at: Date;
};

export class Crud<
  CreateType extends TCreatedAt,
  NewType extends TUId & CreateType,
  NormalType extends TId
> {
  private collectionName: string;
  private collectionRef: CollectionReference;
  private firestore: Firestore;

  constructor(firestore: Firestore, collectionName: string) {
    this.collectionName = collectionName;
    this.firestore = firestore;
    this.collectionRef = collection(firestore, collectionName);
  }

  public read = async (docId: string) => {
    const docRaw = await getDoc(
      doc(this.firestore, this.collectionName, docId)
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const docData = normalizeData<NormalType>(docRaw);
    return docData;
  };
  public readAll = async (...queryConstrains: QueryConstraint[]) => {
    const collectionRaw = await getDocs(
      query(collection(this.firestore, this.collectionName), ...queryConstrains)
    );
    const collectionNormalized = normalizeDataArray<NormalType>(
      collectionRaw.docs
    );
    return collectionNormalized;
  };

  public create = async (createBody: CreateType) => {
    const auth = getAuth();
    // Продумать как добавить поле created_at, чтобы можно было передавать
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newThing: NewType = {
      user_id: auth.currentUser?.uid ?? "",
      ...createBody,
      created_at: createBody.created_at
        ? Timestamp.fromDate(createBody.created_at)
        : serverTimestamp(),
    };
    const newDocRef = await addDoc(this.collectionRef, newThing);
    const createdDoc = await this.read(newDocRef.id);
    return createdDoc;
  };

  public update = async (docId: string, updateBody: Partial<NewType>) => {
    const docRef = doc(this.firestore, this.collectionName, docId);
    await setDoc(docRef, updateBody, { merge: true });
    const updated = this.read(docRef.id);
    return updated;
  };

  public delete = async (docId: string) => {
    const docRef = doc(this.firestore, this.collectionName, docId);
    await deleteDoc(docRef);
  };

  
}
