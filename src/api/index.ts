import {
  NewAccount,
  NewTransaction,
  createRecord,
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
      await this.account.update(newTransaction.accountId, {
        value: newAccountValue.toString(),
      });

      // create transaction record
      const createdTranasction = await this.transaction
        .create(newTransaction)
      return createdTranasction;
    },
    create: async (newTransaction: NewTransaction) => {
      const createdTranasction = await createRecord(
        "transactions",
        newTransaction
      );
      return createdTranasction;
    },
  };
}


export const Api = new API();
