import { FC } from "react";

import { useParams } from "react-router-dom";

import { Api } from "@/api";
import { useRequest } from "@/lib/hooks/useRequest";
import CardsList from "@/components/layout/cards-list";

import AccountPageHeader from "./account-page-header";
import CreateTransactionModal from "./create-transaction-modal";
import TransactionCard, { TransactionCardSkeleton } from "./transaction-card";

const AccountPage: FC = () => {
  const { accountId } = useParams<"accountId">();

  const { data: transactions, run: updateTransactions } = useRequest(
    Api.getTransactionsForAccount,
    accountId ?? ""
  );
  const { data: account, run: updateAccount } = useRequest(
    Api.getAccount,
    accountId ?? ""
  );

  return (
    <>
      <AccountPageHeader account={account} updateAccount={updateAccount} />
      <div className={"flex justify-between items-center"}>
        <p>Your recent transactions</p>
        <CreateTransactionModal
          accountId={accountId}
          onSuccess={() => {
            updateTransactions(accountId ?? "");
            updateAccount(accountId ?? "");
          }}
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
