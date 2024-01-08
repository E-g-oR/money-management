import * as A from "fp-ts/ReadonlyArray";
import { pipe } from "fp-ts/lib/function";
import * as RR from "fp-ts/ReadonlyRecord";
import * as RNEA from "fp-ts/ReadonlyNonEmptyArray";
import {
  TransactionType,
  TTransaction,
} from "@/types/transactions/transaction";

const groupByDate = (transaction: TTransaction) =>
  transaction.created_at.toDate().toISOString().split("T")[0];

const reduceTransactionsForDates = (
  transactions: ReadonlyArray<TTransaction>
) =>
  pipe(
    transactions,
    A.reduce({}, (acc, transaction) => {
      if (transaction.type === TransactionType.Expense) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc.expence = (acc.expence ?? 0) + transaction.value;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc.income = (acc.income ?? 0) + transaction.value;
      }
      return acc;
    })
  );

const extractDateFromRecordKeys = ([date, chartData]: [
  date: string,
  chartData: { income?: number; expence?: number }
]) => ({ date, ...chartData });

export const processChartData = (transactions: ReadonlyArray<TTransaction>) =>
  pipe(
    transactions,
    RNEA.groupBy(groupByDate),
    RR.map(reduceTransactionsForDates),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    RR.toEntries,
    A.map(extractDateFromRecordKeys)
  );
