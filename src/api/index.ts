import { Account, Dept, NewTransaction } from "thin-backend";

import { Auth } from "@/pages/auth/LoginForm";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  Query,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { Accounts, Depts, Transactions } from "./cruds";
import { TId, normalizeData, normalizeDataArray } from "./utils/normalizeData";
import {
  TAccount,
  TCreateAccount,
  TNewAccount,
} from "@/types/accounts/account";
import {
  TCreateTransaction,
  TNewTransaction,
  TTransaction,
  TransactionType,
} from "@/types/transactions/transaction";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

type TUId = {
  user_id: string;
};

class Crud<
  CreateType,
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
    // TODO: Продумать как добавить поле created_at, чтобы можно было передавать
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newThing: NewType = {
      user_id: auth.currentUser?.uid ?? "",
      ...createBody,
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

  // TODO: delete method
  public delete = async (docId: string) => {};
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export class API {
  private firebaseApp: FirebaseApp;
  private fireStore: Firestore;
  private accounts: Crud<TCreateAccount, TNewAccount, TAccount>;
  private transactions: Crud<TCreateTransaction, TNewTransaction, TTransaction>;
  // private depts: Crud;

  constructor(firebaseApp: FirebaseApp) {
    this.firebaseApp = firebaseApp;
    this.fireStore = getFirestore(firebaseApp);

    this.accounts = new Crud(this.fireStore, "accounts");
    this.transactions = new Crud(this.fireStore, "transactions");
    // this.depts = collection(this.fireStore, "depts");
  }

  /**
   * Log in with email and password
   * @param auth Auth object with keys "email" and "password"
   * @returns user
   */
  public logIn = async ({ email, password }: Auth) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };

  //! ------------------------- Accounts -------------------------

  private getAccountsQuery = () => {
    const currentUser = getAuth().currentUser;
    const q = where("user_id", "==", currentUser?.uid ?? "");
    return q;
  };

  public getAccounts = async (): Promise<ReadonlyArray<TAccount>> => {
    const q = this.getAccountsQuery();
    const accounts = await this.accounts.readAll(q);
    // TODO: сохранить список счетов в хранилище
    return accounts;
  };

  public getAccount = async (accountId: string) => {
    const account = await this.accounts.read(accountId);
    return account;
  };

  /**
   * Update account
   */
  public updateAccount = async (
    accountId: string,
    toUpdate: Partial<TNewAccount>
  ): Promise<TAccount> => {
    const updatedAccount = await this.accounts.update(accountId, toUpdate);
    return updatedAccount;
  };

  /**
   * Create new account
   * @param createAccount account body to create new account
   */
  public createAccount = async (createAccount: TCreateAccount) => {
    // TODO: придумать как настроить created_at через функ create в Crud
    const newAccountPrepeared: TNewAccount = {
      created_at: serverTimestamp(),
      ...createAccount,
    };
    const newAccountResponse = await this.accounts.create(newAccountPrepeared);
    return newAccountResponse;
  };

  /**
   * TODO: Delete account
   * @param accountId<string> string
   */
  public deleteAccount = async () => {};

  //* ------------------------- -------------------------

  //! ------------------------- Transactions -------------------------

  private getTransactionsQuery = (accountId: string) => {
    const q = where("account_id", "==", accountId);
    return q;
  };

  public getTransactionsForAccount = async (accountId: string) => {
    const q = this.getTransactionsQuery(accountId);
    const transactions = await this.transactions.readAll(q);
    return transactions;
  };

  public createTransaction = async (transactionBody: TCreateTransaction) => {
    const newTransactionPrepeared: TNewTransaction = {
      created_at: serverTimestamp(),
      ...transactionBody,
    };
    const transaction = await this.transactions.create(newTransactionPrepeared);
    return transaction;
  };

  public createTransactionAndUpdateAccount = async (
    transactionBody: TCreateTransaction
  ) => {
    // TODO: переписать все на batch или transaction, чтобы выполнять все записи за один запрос
    // TODO: добавить проверку на отрицательное число (нельзя потратить больше, чем есть на счету)
    const account = await this.getAccount(transactionBody.account_id);
    const newAccountValue =
      transactionBody.type === TransactionType.Income
        ? account.value + transactionBody.value
        : account.value - transactionBody.value;

    const transaction = await this.createTransaction(transactionBody);
    await this.updateAccount(transactionBody.account_id, {
      value: newAccountValue,
    });
    return transaction;
  };
  //* ------------------------- -------------------------

  //! ------------------------- Depts -------------------------
  public createDept = async () => {};
  //* ------------------------- -------------------------

  public depts = {
    crud: Depts,
    pay: async (dept: Dept, value: number, account: Account) => {
      const newDeptCoveredValue = dept.coveredValue + value;
      this.transactions.createTransactionAndUpdateAccount({
        title: dept.name,
        accountId: account.id,
        transactionType: "expense",
        value: value.toString(),
      });
      const updatedDept = await this.depts.crud.update(dept.id, {
        coveredValue: newDeptCoveredValue,
      });
      return updatedDept;
    },
  };
}

export const Api = new API(firebaseApp);
