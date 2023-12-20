import { FC } from "react";

import { query } from "thin-backend";
import { useParams } from "react-router-dom";
import { useQuery } from "thin-backend-react";

import CardsList from "@/components/layout/cards-list";

import AccountPageHeader from "./account-page-header";
import CreateTransactionModal from "./create-transaction-modal";
import TransactionCard, { TransactionCardSkeleton } from "./transaction-card";
import { useRequest } from "@/lib/hooks/useRequest";
import { Api } from "@/api";

const AccountPage: FC = () => {
  const { accountId } = useParams<"accountId">();

  const { data: transactions, run } = useRequest(
    Api.getTransactionsForAccount,
    accountId ?? ""
  );
  console.log(transactions);

  return (
    <>
      <AccountPageHeader accountId={accountId} />
      <div className={"flex justify-between items-center"}>
        <p>Your recent transactions</p>
        <CreateTransactionModal
          accountId={accountId}
          onSuccess={() => run(accountId ?? "")}
        />
      </div>
      <CardsList
        data={transactions}
        render={(transaction, i) => (
          <TransactionCard key={i} transaction={transaction} />
        )}
        skeletonComponent={<TransactionCardSkeleton />}
        fallback={"You dont have recent transactions on this account."}
      />
    </>
  );
};

export default AccountPage;
