import { useDataStore, transormListToMap } from "@/store/data";
import { TCreateAccount, TNewAccount, TAccount } from "@/types/accounts/account";
import { TCreateDept, TNewDept, TDept } from "@/types/depts/dept";
import { TCreateTransaction, TNewTransaction, TTransaction, TransactionType } from "@/types/transactions/transaction";
import { FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, getFirestore, serverTimestamp, where } from "firebase/firestore";
import { Crud } from "./crud";
import { Auth } from "@/pages/auth/LoginForm";

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
    // TODO: придумать как настроить created_at через функ create в Crud
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
