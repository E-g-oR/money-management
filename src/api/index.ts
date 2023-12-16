import { Account, Dept, NewTransaction } from "thin-backend";
import { Accounts, Depts, Transactions } from "./cruds";

export class API {
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

export const Api = new API();
