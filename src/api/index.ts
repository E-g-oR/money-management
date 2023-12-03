import {
  Account,
  Dept,
  NewAccount,
  NewDept,
  NewTransaction,
  createRecord,
  deleteRecord,
  query,
  updateRecord,
} from "thin-backend";

export class API {
  public account = {
    create: async (newAccount: NewAccount) => {
      const createdAccount = await createRecord("accounts", newAccount);
      return createdAccount;
    },
    update: async (id: string, data: Partial<NewAccount>) => {
      console.log("update account", id);
      
      const updatedAccount = await updateRecord("accounts", id, data);
      return updatedAccount;
    },
  };
  public transaction = {
    createTransactionAndUpdateAccount: async (
      newTransaction: NewTransaction
    ) => {
      // check if is expense or income
      const isIncome = newTransaction.transactionType === "income";

      // find target account
      const account = await query("accounts")
        .where("id", newTransaction.accountId)
        .fetchOne();
        
      const floatAccountValue = parseFloat(account.value),
        floatIncomingValue = parseFloat(newTransaction.value ?? "");

      const newAccountValue = isIncome
        ? floatAccountValue + floatIncomingValue
        : floatAccountValue - floatIncomingValue;

        // update account value
      this.account.update(newTransaction.accountId, {
        value: newAccountValue.toString(),
      });

      // create transaction record
      this.transaction.create(newTransaction);
      return;
    },
    create: async (newTransaction: NewTransaction) => {
      console.log("create transaction");
      const createdTranasction = await createRecord(
        "transactions",
        newTransaction
      );
      return createdTranasction;
    },
  };
  public depts = {
    create: async (newDept: NewDept) => {
      const dept = await createRecord("depts", newDept);
      return dept;
    },
    update: async (id: string, data: Partial<NewDept>) => {
      const updatedDept = await updateRecord("depts", id, data);
      return updatedDept;
    },
    pay: async (dept: Dept, value: number, account: Account) => {
      const newDeptCoveredValue = dept.coveredValue + value;
      this.transaction.createTransactionAndUpdateAccount({
        title: dept.name,
        accountId: account.id,
        transactionType: "expense",
        value: value.toString(),
      });
      const updatedDept = await this.depts.update(dept.id, {
        coveredValue: newDeptCoveredValue,
      });
      return updatedDept;
    },
    delete: async (deptId: string) => {
      const deletedDept = await deleteRecord("depts", deptId);
      return deletedDept;
    },
  };
}

export const Api = new API();
