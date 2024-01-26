import { FC, useMemo } from "react";

import CardsList from "@/components/layout/cards-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/hooks/useTranslation";
import { TTransaction } from "@/types/transactions/transaction";

import { groupTransactions } from "../account/utils/group-transactions";
import TransactionCard, { TransactionCardSkeleton } from "./transaction-card";
import { Currencies } from "@/types/currency";

type Props = {
  transactions: ReadonlyArray<TTransaction> | null;
  currency: Currencies
};
export const TransactionsView: FC<Props> = ({ transactions, currency }) => {
  const t = useTranslation();
  const groupedTransactions = useMemo(
    () => groupTransactions(transactions ?? []),
    [transactions]
  );

  return (
    <ScrollArea className={"h-full"}>
      <div className={"grid gap-3 md:gap-6"}>
        {groupedTransactions.map((transactionsList) => (
          <div
            key={transactionsList[0].created_at.toDate().toISOString()}
            className={"flex flex-col gap-2"}
          >
            <p className={"text-lg font-semibold"}>
              {t.format.dateHeader(transactionsList[0].created_at.toDate())}
            </p>
            <CardsList
              data={transactionsList}
              isLoading={false}
              render={(transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  currency={currency}
                />
              )}
              skeletonComponent={<TransactionCardSkeleton />}
              fallback={t.accountPage.noTransactionsFallback}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TransactionsView;
