import {
  Account,
  Dept,
  NewTransaction,
} from "thin-backend";
import { Accounts, Depts, Transactions } from "./cruds";

export class API {
  public accounts = {
    crud: Accounts,
  };

  public transactions = {
    crud: Transactions,
    createTransactionAndUpdateAccount: async (
      newTransaction: NewTransaction
    ) => {
      // check if is expense or income
      const isIncome = newTransaction.transactionType === "income";

      // find target account
      const account = await this.accounts.crud.read(newTransaction.accountId)

      const floatAccountValue = parseFloat(account.value),
        floatIncomingValue = parseFloat(newTransaction.value ?? "");

      const newAccountValue = isIncome
        ? floatAccountValue + floatIncomingValue
        : floatAccountValue - floatIncomingValue;

      // update account value
      this.accounts.crud.update(newTransaction.accountId, {
        value: newAccountValue.toString(),
      });

      // create transaction record
      this.transactions.crud.create(newTransaction);
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

export const Api = new API();
