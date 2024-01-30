import { TAccount } from "@/types/accounts/account";
import { TDept } from "@/types/depts/dept";
import { create } from "zustand";

interface IDataStore {
  accountsById: Map<string, TAccount>;
  isAccountsLoading: boolean;
  selectedAccountId: string;
  isDeptsLoading: boolean;
  deptsList: ReadonlyArray<TDept> | null;
  setAccountsById: (accountsById: Map<string, TAccount>) => void;
  setSelectedAccountId: (selectedAccountId: string) => void;
  setIsAccountsLoading: (isAccountsLoading: boolean) => void;
  setIsDeptsLoading: (isDeptsLoading: boolean) => void;
  setDeptsList: (deptsList: ReadonlyArray<TDept>) => void;
}

export const useDataStore = create<IDataStore>((set) => ({
  accountsById: new Map(),
  isAccountsLoading: false,
  selectedAccountId: "",
  isDeptsLoading: false,
  deptsList: null,
  setAccountsById: (accountsById) => set({ accountsById }),
  setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),
  setIsAccountsLoading: (isAccountsLoading: boolean) =>
    set({ isAccountsLoading }),
  setIsDeptsLoading: (isDeptsLoading: boolean) => set({ isDeptsLoading }),
  setDeptsList: (deptsList: ReadonlyArray<TDept> | null) => set({ deptsList }),
}));

export const getAccountsById = (store: IDataStore) => store.accountsById,
  getSetAccountsById = (store: IDataStore) => store.setAccountsById,
  getSelectedAccountId = (store: IDataStore) => store.selectedAccountId,
  getSetSelectedAccountId = (store: IDataStore) => store.setSelectedAccountId,
  getIsAccountsLoading = (store: IDataStore) => store.isAccountsLoading,
  getSetIsAccountsLoading = (store: IDataStore) => store.setIsAccountsLoading,
  getIsDeptsLoading = (store: IDataStore) => store.isDeptsLoading,
  getSetIsDeptsLoading = (store: IDataStore) => store.setIsDeptsLoading,
  getDeptsList = (store: IDataStore) => store.deptsList,
  getSetDeptsList = (store: IDataStore) => store.setDeptsList;
  

interface Id {
  id: string;
}
export function transormListToMap<T extends Id>(list: ReadonlyArray<T>) {
  return list.reduce((accum, current) => {
    accum.set(current.id, current);
    return accum;
  }, new Map<string, T>());
}
