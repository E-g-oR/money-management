import { TCreatedAt } from "@/api/crud";
import { FieldValue, Timestamp } from "firebase/firestore";

export type TCreateAccount = TCreatedAt & {
  name: string;
  value: number;
  description?: string;
};

export type TNewAccount = TCreateAccount & {
  user_id: string;
  created_at: FieldValue;
};

export type TAccount = TNewAccount & {
  id: string;
  created_at: Timestamp;
};
