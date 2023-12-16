/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Account,
  Dept,
  NewAccount,
  NewDept,
  NewTransaction,
  NewUser,
  TableName,
  Transaction,
  User,
  createRecord,
  deleteRecord,
  query,
  updateRecord,
} from "thin-backend";
type TData = User | Account | Dept | Transaction;
type TCreateData = NewUser | NewAccount | NewDept | NewTransaction;

interface Crud<T, NT> {
  create: (data: NT) => Promise<T>;
  read: (id: string) => Promise<T>;
  readAll: () => Promise<ReadonlyArray<T>>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

const createCrud = <T extends TData, NT extends TCreateData>(
  tableName: TableName
): Crud<T, NT> => ({
  /* @ts-ignore */
  create: async (data: NT) => await createRecord(tableName, data),
  /* @ts-ignore */
  read: async (id) => await query(tableName).where("id", id).fetchOne(),
  /* @ts-ignore */
  readAll: async () => await query(tableName).where("id", id).fetch(),
  /* @ts-ignore */
  update: async (id, data: Partial<T>) =>
    await updateRecord(tableName, id, data),
  delete: async (id) => await deleteRecord(tableName, id),
});

export const Transactions = createCrud<Transaction, NewTransaction>(
  "transactions"
);
export const Accounts = createCrud<Account, NewAccount>("accounts");
export const Depts = createCrud<Dept, NewDept>("depts");
