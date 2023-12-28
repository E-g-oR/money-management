import { TCreatedAt } from "@/api/crud";
import { FieldValue, Timestamp } from "firebase/firestore";

export type TCreateDept = TCreatedAt & {
  name: string;
  description: string;
  coveredValue: number;
  value: number;
};

export type TNewDept = TCreateDept & {
  created_at: FieldValue;
  user_id: string;
};

export type TDept = TCreateDept & {
  id: string;
  created_at: Timestamp;
};
