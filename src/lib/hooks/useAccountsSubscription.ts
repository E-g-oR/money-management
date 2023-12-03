import { useEffect } from 'react';
import {
  getSetAccountsById,
  transormListToMap,
  useDataStore,
} from "@/store/data";
import { query } from "thin-backend";
import { useQuery } from "thin-backend-react";

export const useAccountsSubscription = () => {
  const setAccounts = useDataStore(getSetAccountsById);
  const accounts = useQuery(query("accounts").orderByDesc("updatedAt"));
 
  useEffect(() => {
    if (accounts) {
      setAccounts(transormListToMap(accounts));
    }
  }, [accounts, setAccounts]);

  return accounts
};
