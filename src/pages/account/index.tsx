import { FC } from "react";

import { useParams } from "react-router-dom";

import { Api } from "@/api";
import { useRequest } from "@/lib/hooks/useRequest";
import CardsList from "@/components/layout/cards-list";

import AccountPageHeader from "./account-page-header";
import CreateTransactionModal from "./create-transaction-modal";
import TransactionCard, { TransactionCardSkeleton } from "./transaction-card";
import { useTranslation } from "@/lib/hooks/useTranslation";

const AccountPage: FC = () => {
  const t = useTranslation();
  const { accountId } = useParams<"accountId">();

  const {
    data: transactions,
    run: updateTransactions,
    isLoading: isLoadingTransactions,
  } = useRequest(Api.getTransactionsForAccount, accountId ?? "");
  const { data: account, run: updateAccount } = useRequest(
    Api.getAccount,
    accountId ?? ""
  );

  return (
    <>
      <AccountPageHeader account={account} updateAccount={updateAccount} />
      <div className={"flex justify-between items-center"}>
        <p>{t.accountPage.recentTransactions}</p>
        <CreateTransactionModal
          accountId={accountId}
          onSuccess={() => {
            updateTransactions(accountId ?? "");
            updateAccount(accountId ?? "");
          }}
        />
      </div>
      <CardsList
        isLoading={isLoadingTransactions}
        data={transactions}
        render={(transaction, i) => (
          <TransactionCard key={i} transaction={transaction} />
        )}
        skeletonComponent={<TransactionCardSkeleton />}
        fallback={t.accountPage.noTransactionsFallback}
      />
    </>
  );
};

export default AccountPage;
