import { FieldValue, Timestamp } from "firebase/firestore";
// import { FieldValue } from "react-hook-form";

export type TCreateAccount = {
    name: string, 
    value: number,
    description?: string
}

export type TNewAccount = TCreateAccount & {
    user_id: string,
    created_at: FieldValue
}

export type TAccount = TNewAccount & {
  id: string;
  created_at: Timestamp;
};