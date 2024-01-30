import { FC, useMemo } from "react";

import CardsList from "@/components/layout/cards-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/hooks/useTranslation";

import { groupTransactions } from "../account/utils/group-transactions";
import TransactionCard, { TransactionCardSkeleton } from "./transaction-card";
import { Currencies } from "@/types/currency";
import {
  getSelectedAccountId,
  getTransactionsByAccountId,
  useDataStore,
} from "@/store/data";
import Show from "@/components/show";
import LinearLoader from "@/components/linear-loader";

type Props = {
  currency: Currencies;
  isLoading?: boolean;
};
export const TransactionsView: FC<Props> = ({
  currency,
  isLoading = false,
}) => {
  const t = useTranslation();
  const selectedAccountId = useDataStore(getSelectedAccountId);
  const transactionsByAccountId = useDataStore(getTransactionsByAccountId);

  const groupedTransactions = useMemo(
    () =>
      groupTransactions(
        transactionsByAccountId.has(selectedAccountId)
          ? transactionsByAccountId.get(selectedAccountId)!
          : []
      ),
    [transactionsByAccountId, selectedAccountId]
  );

  return (
    <ScrollArea className={"h-full"}>
      <div className={"grid gap-3 md:gap-6 relative"}>
        <Show when={groupedTransactions.length === 0}>
          <Show
            when={isLoading}
            fallback={t.accountPage.noTransactionsFallback}
          >
            <div
              className={"grid grid-cols xl:grid-cols-2 2xl:grid-cols-3 gap-3"}
            >
              <TransactionCardSkeleton />
              <TransactionCardSkeleton />
              <TransactionCardSkeleton />
            </div>
          </Show>
        </Show>
        <Show when={groupedTransactions.length > 0}>
          <Show when={isLoading}>
            <LinearLoader />
          </Show>
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
        </Show>

        {/* <Show when={isLoading && groupedTransactions.length === 0}>
          <div
            className={"grid grid-cols xl:grid-cols-2 2xl:grid-cols-3 gap-3"}
          >
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
            <TransactionCardSkeleton />
          </div>
        </Show> */}

        {/* <Show when={!isLoading}>
          <Show
            when={groupedTransactions.length > 0}
            fallback={t.accountPage.noTransactionsFallback}
          >
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
          </Show>
        </Show> */}
      </div>
    </ScrollArea>
  );
};

export default TransactionsView;
