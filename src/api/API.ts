import { Auth } from "@/types/auth";
import { FirebaseApp } from "firebase/app";
import { transormListToMap, useDataStore } from "@/store/data";
import { TCreateDept, TDept, TNewDept } from "@/types/depts/dept";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, getFirestore, where } from "firebase/firestore";
import {
  TAccount,
  TCreateAccount,
  TNewAccount,
} from "@/types/accounts/account";
import {
  TCreateTransaction,
  TNewTransaction,
  TransactionType,
  TTransaction,
} from "@/types/transactions/transaction";

import { Crud } from "./crud";

export class API {
  private fireStore: Firestore;
  private accounts: Crud<TCreateAccount, TNewAccount, TAccount>;
  private transactions: Crud<TCreateTransaction, TNewTransaction, TTransaction>;
  private depts_: Crud<TCreateDept, TNewDept, TDept>;

  constructor(firebaseApp: FirebaseApp) {
    this.fireStore = getFirestore(firebaseApp);

    this.accounts = new Crud(this.fireStore, "accounts");
    this.transactions = new Crud(this.fireStore, "transactions");
    this.depts_ = new Crud(this.fireStore, "depts");
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

  public getAuth = () => getAuth();

  //! ------------------------- Accounts -------------------------

  private getAccountsQuery = () => {
    const currentUser = getAuth().currentUser;
    const q = where("user_id", "==", currentUser?.uid ?? "");
    return q;
  };

  public getAccounts = async (): Promise<ReadonlyArray<TAccount>> => {
    const q = this.getAccountsQuery();
    const accounts = await this.accounts.readAll(q);

    const setAccounts = useDataStore.getState().setAccountsById;
    setAccounts(transormListToMap(accounts));
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
    const newAccountResponse = await this.accounts.create(createAccount);
    return newAccountResponse;
  };

  /**
   * Delete account
   *
   * Deletes account itself and all associated transactions
   * @param accountId<string> string
   */
  public deleteAccount = async (account_id: string) => {
    await this.accounts.delete(account_id);

    // delete all transactions for this account
    this.getTransactionsForAccount(account_id).then((allTransactions) => {
      allTransactions.forEach((transaction) =>
        this.transactions.delete(transaction.id)
      );
    });
    return;
  };

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
    const transaction = await this.transactions.create(transactionBody);
    return transaction;
  };

  public createTransactionAndUpdateAccount = async (
    transactionBody: TCreateTransaction
  ) => {
    // TODO: переписать все на batch или transaction, чтобы выполнять все записи за один запрос
    const account = await this.getAccount(transactionBody.account_id);
    const newAccountValue =
      transactionBody.type === TransactionType.Income
        ? account.value + transactionBody.value
        : account.value - transactionBody.value;

    if (newAccountValue < 0) {
      throw new Error("Cannot create transaction with negative value");
    }

    const [transaction] = await Promise.all([
      this.createTransaction(transactionBody),
      this.updateAccount(transactionBody.account_id, {
        value: newAccountValue,
      }),
    ]);
    return transaction;
  };
  //* ------------------------- -------------------------

  //! ------------------------- Depts -------------------------
  public createDept = async (createBody: TCreateDept) => {
    const dept = await this.depts_.create(createBody);
    return dept;
  };

  public getDepts = async () => {
    const q = this.getAccountsQuery();
    const depts = await this.depts_.readAll(q);
    return depts;
  };

  public payDept = async (dept: TDept, value: number, account: TAccount) => {
    const newDeptCoveredValue = dept.coveredValue + value;
    await this.createTransactionAndUpdateAccount({
      account_id: account.id,
      title: dept.name,
      description: dept.description ?? "",
      type: TransactionType.Expense,
      value,
      created_at: new Date(), // TODO: сделать выбор даты когда был оплачен долг
    });
    const updatedDept = await this.depts_.update(dept.id, {
      coveredValue: newDeptCoveredValue,
    });
    return updatedDept;
  };

  public deleteDept = async (deptId: string) => {
    await this.depts_.delete(deptId);
  };
  //* ------------------------- -------------------------
}
