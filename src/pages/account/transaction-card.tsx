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
    <div className="flex gap-4 px-4 py-2 border dark:border-red-500/30 border-red-700/50 rounded-xl">
      <ExpenseIcon />
      <div className="flex flex-col gap-0.5 flex-1">
        <div className={"flex items-baseline flex-1"}>
          <p className="text-2xl flex-1">title</p>
          <p className={"text-lg dark:text-red-500 text-red-700"}>$ 17.52</p>
        </div>
        <div className={"flex items-center text-muted-foreground gap-3"}>
          <p className={"line-clamp-1 text-ellipsis flex-1"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
            voluptas aliquam commodi facilis voluptatem exercitationem
            perspiciatis eius eos dolore. Dicta quidem accusantium nostrum
            repellendus eligendi obcaecati quo laudantium fugit harum.
          </p>
          <p className={"text-sm"}>Sep 17, 5:34 pm</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
