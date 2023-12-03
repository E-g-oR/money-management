import { Account } from "thin-backend";

const reduceCallback = (
  accumulator: Map<string, Account>,
  account: Account
) => {
  accumulator.set(account.id, account);
  return accumulator;
};

export const accountsListToRecord = (accounts: ReadonlyArray<Account>) =>
  accounts.reduce(reduceCallback, new Map<string, Account>());
