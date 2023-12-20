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

// type TUId = {
//   user_id: string
// }

// class Crud<CreateType, NewType extends TUId & CreateType, NormalType extends TId> {
//   private collectionName: string
//   private collectionRef: CollectionReference
//   private firestore: Firestore

//   constructor(firestore: Firestore, collectionName: string) {
//     this.collectionName = collectionName
//     this.firestore = firestore
//     this.collectionRef = collection(firestore, collectionName)
//   }

//   public read = async (docId: string) => {
//     const docRaw = await getDoc(doc(this.firestore, this.collectionName, docId))
//     const docData = normalizeData<NormalType>(docRaw)
//     return docData
//   }
//   public readAll = async (query?: Query) => {
//     const collectionRaw = await getDocs(query ?? collection(this.firestore, this.collectionName))
//     const collectionNormalized = normalizeDataArray<NormalType>(collectionRaw.docs)
//     return collectionNormalized
//   }

//   public create = async (createBody: CreateType) => {
//     const auth = getAuth()
//     // TODO: Продумать как добавить поле created_at, чтобы можно было передавать
//     const newThing: NewType = {
//       user_id: auth.currentUser?.uid ?? "",
//       ...createBody
//     }
//     const newDocRef = await addDoc(this.collectionRef, newThing)
//     const createdDoc = await this.read(newDocRef.id)
//     return createdDoc
//   }

//   public update = async (docId: string, updateBody: Partial<NewType>) => {
//     const docRef = doc(this.firestore, this.collectionName, docId)
//     await setDoc(docRef, updateBody, { merge: true });
//     const updated = this.read(docRef.id)
//     return updated
//   }

//   // TODO: delete method
// }

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export class API {
  private firebaseApp: FirebaseApp;
  private fireStore: Firestore;
  private accountsRef: CollectionReference;
  private transactionsRef: CollectionReference;
  private deptsRef: CollectionReference;

  constructor(firebaseApp: FirebaseApp) {
    this.firebaseApp = firebaseApp;
    this.fireStore = getFirestore(firebaseApp);

    this.accountsRef = collection(this.fireStore, "accounts");
    this.transactionsRef = collection(this.fireStore, "transactions");
    this.deptsRef = collection(this.fireStore, "depts");
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
    const q = query(this.accountsRef, where("user_id", "==", currentUser?.uid));
    return q;
  };

  public getAccounts = async (): Promise<ReadonlyArray<TAccount>> => {
    const q = this.getAccountsQuery();
    const accountsRaw = await getDocs(q);
    const accountsNormalized = normalizeDataArray<TAccount>(accountsRaw.docs);
    // TODO: сохранить список счетов в хранилище
    return accountsNormalized;
  };

  public getAccount = async (accountId: string) => {
    const accountRaw = await getDoc(doc(this.fireStore, "accounts", accountId));
    // TODO: сохранить счет в хранилище
    const account = normalizeData<TAccount>(accountRaw);
    return account;
  };

  /**
   * Update account
   */
  public updateAccount = async (
    accountId: string,
    toUpdate: Partial<TNewAccount>
  ): Promise<TAccount> => {
    const accountRef = doc(this.fireStore, "accounts", accountId);
    await setDoc(accountRef, toUpdate, { merge: true });
    const updatedAccount = (await getDoc(accountRef)).data() as TAccount;
    return updatedAccount;
  };

  /**
   * Create new account
   * @param createAccount account body to create new account
   */
  public createAccount = async (createAccount: TCreateAccount) => {
    const auth = getAuth();
    const newAccountPrepeared: TNewAccount = {
      user_id: auth.currentUser?.uid ?? "",
      created_at: serverTimestamp(),
      ...createAccount,
    };
    const newAccountResponse = await addDoc(
      this.accountsRef,
      newAccountPrepeared
    );
    // console.log((await getDoc(newAccountResponse)).data());
    // TODO: this.getAccounts()
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
    const q = query(this.transactionsRef, where("account_id", "==", accountId));
    return q;
  };

  public getTransactionsForAccount = async (accountId: string) => {
    // console.group("Inside getTransactionsForAccount()"); 
    // console.log("accountId : ", accountId);
    const q = this.getTransactionsQuery(accountId);
    console.log(
      "before getDocs() in getTransactionsForAccount :"
    );

    const transactionsRaw = await getDocs(q);
    console.log("after getDocs() in getTransactionsForAccount :", transactionsRaw);
    
    const transactionsNormalized = normalizeDataArray<TTransaction>(
      transactionsRaw.docs
    );
    // console.log("transactionsNormalized : ", transactionsNormalized);

    // console.groupEnd();
    return transactionsNormalized;
  };

  public createTransaction = async (transactionBody: TCreateTransaction) => {
    const auth = getAuth();
    const newTransactionPrepeared: TNewTransaction = {
      created_at: serverTimestamp(),
      user_id: auth.currentUser?.uid ?? "",
      ...transactionBody,
    };
    console.log(
      "addDoc with newTransactionPrepeared :",
      newTransactionPrepeared
    );
    
    const transactionRef = await addDoc(
      this.transactionsRef,
      newTransactionPrepeared
    );
    const transactionResponse = await getDoc(transactionRef);
    const transaction = normalizeData<TTransaction>(transactionResponse);
    return transaction;
  };

  public createTransactionAndUpdateAccount = async (
    transactionBody: TCreateTransaction
  ) => {
    // TODO: добавить проверку на отрицательное число (нельзя потратить больше, чем есть на счету)
    const account = await this.getAccount(transactionBody.account_id);
    const newAccountValue =
      transactionBody.type === TransactionType.Income
        ? account.value + transactionBody.value
        : account.value - transactionBody.value;

    console.log("before create transaction");
    const transaction = await this.createTransaction(transactionBody);
    console.log("after create transaction");
    console.log("before update account");
    await this.updateAccount(transactionBody.account_id, {
      value: newAccountValue,
    });
    console.log("after update account");

    return transaction;
  };
  //* ------------------------- -------------------------

  //! ------------------------- Depts -------------------------
  public createDept = async () => {};
  //* ------------------------- -------------------------

  public accounts = {
    crud: Accounts,
  };

  public transactions = {
    crud: Transactions,
    /**
     * Создает новую транзакцию и оновляет аккаунт
     *
     * 1. получить целевой аккаунт
     * 2. проверить, есть ли в аккаунте копилка
     *    - действия для копилки
     * 3. посчитать новое значение аккаунта
     *    - если < 0 вернуть ошибку
     * 4. создаем новую транзакцию
     * 5. обновляем значение аккаунта
     */
    createTransactionAndUpdateAccount: async (
      newTransaction: NewTransaction
    ) => {
      // 1. find target account
      const account = await this.accounts.crud.read(newTransaction.accountId);

      // check if is expense or income
      const isIncome = newTransaction.transactionType === "income";

      const floatAccountValue = parseFloat(account.value),
        floatIncomingValue = parseFloat(newTransaction.value ?? "");

      // 3. новое значение аккаунта
      const newAccountValue = isIncome
        ? floatAccountValue + floatIncomingValue
        : floatAccountValue - floatIncomingValue;

      // 4. Создать новую транзакцию
      this.transactions.crud.create(newTransaction);

      // 5. Обновить значение аккаунта
      this.accounts.crud.update(newTransaction.accountId, {
        value: newAccountValue.toString(),
      });
      return;
    },
  };
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
