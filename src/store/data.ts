import { Account } from "thin-backend";
import { create } from "zustand";

interface IDataStore {
  accountsById: Map<string, Account>;
  setAccountsById: (accountsById: Map<string, Account>) => void;
  selectedAccountId: string;
  setSelectedAccountId: (selectedAccountId: string) => void;
}

export const useDataStore = create<IDataStore>((set) => ({
  accountsById: new Map(),
  setAccountsById: (accountsById) => set({ accountsById }),
  selectedAccountId: "",
  setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),
}));

export const getAccountsById = (store: IDataStore) => store.accountsById,
  getSetAccountsById = (store: IDataStore) => store.setAccountsById,
  getSelectedAccountId = (store: IDataStore) => store.selectedAccountId,
  getSetSelectedAccountId = (store: IDataStore) => store.setSelectedAccountId;

interface Id {
  id: string;
}
export function transormListToMap<T extends Id>(list: ReadonlyArray<T>) {
  return list.reduce((accum, current) => {
    accum.set(current.id, current);
    return accum;
  }, new Map<string, T>());
}
