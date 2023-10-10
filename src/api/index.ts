import { NewAccount, createRecord } from "thin-backend";

export const Api = {
  account: {
    create: async (newAccount: NewAccount) => {
      const createdAccount = await createRecord("accounts", newAccount);
      return createdAccount;
    },
  },
};
