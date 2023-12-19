import { FC } from "react";

import { query } from "thin-backend";
import { useParams } from "react-router-dom";
import { useQuery } from "thin-backend-react";

import CardsList from "@/components/layout/cards-list";

import AccountPageHeader from "./account-page-header";
import CreateTransactionModal from "./create-transaction-modal";
import TransactionCard, { TransactionCardSkeleton } from "./transaction-card";

const AccountPage: FC = () => {
  const { accountId } = useParams<"accountId">();

  const transactions = useQuery(
    query("transactions")
      .where("accountId", accountId ?? "")
      .orderByDesc("createdAt")
  );

  return (
    <>
      <AccountPageHeader accountId={accountId} />
      <div className={"flex justify-between items-center"}>
        <p>Your recent transactions</p>
        <CreateTransactionModal accountId={accountId} />
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
