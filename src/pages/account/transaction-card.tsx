import { ChevronDown, ChevronUp } from "lucide-react";
import { FC } from "react";

const IncomeIcon: FC = () => (
  <div
    className={
      "dark:bg-green-500/30 bg-green-700/30 self-center p-2 rounded dark:text-green-500 text-green-700"
    }
  >
    <ChevronUp />
  </div>
);
const ExpenseIcon: FC = () => (
  <div
    className={
      "dark:bg-red-500/30 bg-red-700/30 self-center p-2 rounded dark:text-red-500 text-red-700"
    }
  >
    <ChevronDown />
  </div>
);

const TransactionCard: FC = () => {
  return (
    <div className="flex gap-4 px-4 py-2 border rounded-xl">
      <ExpenseIcon />
      <div className={"flex-1"}>
        <p className="text-2xl">title</p>
        <p>description</p>
      </div>
      <div className={"flex flex-col gap-1.5"}>
        <p className={"self-end text-lg"}>$ 17.52</p>
        <p className="text-sm">Sep 17, 5:34 pm</p>
      </div>
    </div>
  );
};

export default TransactionCard;
