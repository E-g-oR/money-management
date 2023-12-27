import { FieldValue, Timestamp } from "firebase/firestore";

export enum TransactionType {
  Income = "income",
  Expense = "expense",
}

export type TCreateTransaction = {
  value: number;
  title: string;
  description?: string;
  account_id: string;
  type: TransactionType;
  created_at: Date;
};

export type TNewTransaction = TCreateTransaction & {
  created_at: FieldValue;
  user_id: string;
};

export type TTransaction = TCreateTransaction & {
  id: string;
  created_at: Timestamp;
};
