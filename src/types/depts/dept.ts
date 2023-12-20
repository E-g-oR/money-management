export type TCreateDept = {
  name: string;
  description: string;
  coveredValue: number;
  value: number;
};

export type TDept = TCreateDept & {
  id: string;
};
