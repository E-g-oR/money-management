import { Account, Dept, NewTransaction } from "thin-backend";

import { Auth } from "@/pages/auth/LoginForm";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { Accounts, Depts, Transactions } from "./cruds";
import { normalizeData, normalizeDataArray } from "./utils/normalizeData";
import { TAccount } from "@/types/accounts/account";

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

  // ------------------------- Accounts -------------------------
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
  public updateAccount = async () => {};

  /**
   * Create account
   */
  public createAccount = async () => {};

  /**
   * Delete account
   * @param accountId<string> string
   */
  public deleteAccount = async () => {};
  // ------------------------- -------------------------

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
