import { TAccount } from "@/types/accounts/account";
import { create } from "zustand";

interface IDataStore {
  accountsById: Map<string, TAccount>;
  isAccountsLoading: boolean;
  selectedAccountId: string;
  setAccountsById: (accountsById: Map<string, TAccount>) => void;
  setSelectedAccountId: (selectedAccountId: string) => void;
  setIsAccountsLoading: (isAccountsLoading: boolean) => void;
}

export const useDataStore = create<IDataStore>((set) => ({
  accountsById: new Map(),
  isAccountsLoading: false,
  setAccountsById: (accountsById) => set({ accountsById }),
  selectedAccountId: "",
  setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),
  setIsAccountsLoading: (isAccountsLoading: boolean) =>
    set({ isAccountsLoading }),
}));

export const getAccountsById = (store: IDataStore) => store.accountsById,
  getSetAccountsById = (store: IDataStore) => store.setAccountsById,
  getSelectedAccountId = (store: IDataStore) => store.selectedAccountId,
  getSetSelectedAccountId = (store: IDataStore) => store.setSelectedAccountId,
  getIsAccountsLoading = (store: IDataStore) => store.isAccountsLoading,
  getSetIsAccountsLoading = (store: IDataStore) => store.setIsAccountsLoading;

interface Id {
  id: string;
}
export function transormListToMap<T extends Id>(list: ReadonlyArray<T>) {
  return list.reduce((accum, current) => {
    accum.set(current.id, current);
    return accum;
  }, new Map<string, T>());
}
