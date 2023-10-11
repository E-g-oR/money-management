import { NewAccount, createRecord, updateRecord } from "thin-backend";

export const Api = {
  account: {
    create: async (newAccount: NewAccount) => {
      const createdAccount = await createRecord("accounts", newAccount);
      return createdAccount;
    },
    update: async (id: string, data: Partial<NewAccount>) => {
      const updatedAccount = await updateRecord("accounts", id, data);
      return updatedAccount;
    },
  },
};
