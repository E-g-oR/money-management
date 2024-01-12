import * as S from "fp-ts/string";
import { contramap } from "fp-ts/Eq";
import { pipe } from "fp-ts/lib/function";
import * as RNEA from "fp-ts/ReadonlyNonEmptyArray";
import { TTransaction } from "@/types/transactions/transaction";

const groupByDate = pipe(
  S.Eq,
  contramap(
    (transaction: TTransaction) =>
      transaction.created_at.toDate().toISOString().split("T")[0]
  )
);

export const groupTransactions = (transactions: ReadonlyArray<TTransaction>) =>
  pipe(transactions, RNEA.group(groupByDate));
