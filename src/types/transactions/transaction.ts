import { FieldValue, Timestamp } from "firebase/firestore";

export type TCreateTransaction = {
    value: number,
    title: string,
    description?: string,
    account_id: string
}

export type TNewTransaction = TCreateTransaction & {
  created_at: FieldValue;
};

export type TTransaction = TCreateTransaction & {
    id: string
    created_at: Timestamp
}