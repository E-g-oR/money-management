import { FC, useMemo } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  TransactionType,
  TTransaction,
} from "@/types/transactions/transaction";
import { Card } from "@/components/ui/card";
import Show from "@/components/show";
import { Currencies } from "@/types/currency";

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

interface Props {
  transaction: TTransaction;
  currency?: Currencies
}

export const TransactionCard: FC<Props> = ({ transaction, currency = Currencies.BYN }) => {
  const t = useTranslation();
  const isIncome = useMemo(
    () => transaction.type === TransactionType.Income,
    [transaction]
  );

  return (
    <Card className={cn("flex gap-4 px-4 py-2.5")}>
      {isIncome ? <IncomeIcon /> : <ExpenseIcon />}
      <div className="flex flex-col gap-0.5 flex-1">
        <div className={"flex items-baseline flex-1 gap-3"}>
          <p
            className={"text-base sm:text-lg  flex-1 line-clamp-1 text-ellipsis"}
          >
            {transaction.title}
          </p>
          <p
            className={cn(
              "text-lg ",
              isIncome
                ? "dark:text-green-500 text-green-700"
                : "dark:text-red-500 text-red-700"
            )}
          >
            {t.format.currency(transaction.value, currency)}
          </p>
        </div>

        <div className={"flex items-center text-muted-foreground gap-3"}>
          <Show when={!!transaction?.description}>
            <p className={"line-clamp-1 text-ellipsis flex-1 text-sm md:text-base"}>
              {transaction.description}
            </p>
          </Show>
          {/* <p className={"text-sm ml-auto"}>
            {t.format.date(transaction.created_at.toDate().toISOString())}
          </p> */}
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;

export const TransactionCardSkeleton: FC = () => (
  <div className={"flex gap-4 px-4 py-2 border rounded-xl"}>
    <IncomeIcon />
    <div className="flex flex-col gap-2 flex-1 w-full">
      <div className={"flex items-baseline flex-1 justify-between"}>
        <Skeleton className={"h-8 w-20"} />
        <Skeleton className={"h-6 w-16"} />
      </div>
      <div className={"flex items-center gap-3 justify-between"}>
        <Skeleton className={"h-6 w-32"} />
        <Skeleton className={"h-5 w-24"} />
      </div>
    </div>
  </div>
);
