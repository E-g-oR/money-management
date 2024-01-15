import { FC } from "react";

import { useParams } from "react-router-dom";

import { Api } from "@/api";
import { useRequest } from "@/lib/hooks/useRequest";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AreaChart from "./area-chart";
import TransactionsView from "./transactions-view";
import AccountPageHeader from "./account-page-header";
import { groupTransactions } from "./utils/group-transactions";
import CreateTransactionModal from "./create-transaction-modal";

const AccountPage: FC = () => {
  const t = useTranslation();
  const { accountId } = useParams<"accountId">();

  const {
    data: transactions,
    run: updateTransactions,
  } = useRequest(Api.getTransactionsForAccount, accountId ?? "");

  const { data: account, run: updateAccount } = useRequest(
    Api.getAccount,
    accountId ?? ""
  );

  return (
    <>
      <AccountPageHeader account={account} updateAccount={updateAccount} />
      <div className={"flex justify-between items-center"}>
        {/* TODO: make dynamic label */}
        <p>{t.accountPage.recentTransactions}</p>
        <CreateTransactionModal
          accountId={accountId}
          onSuccess={() => {
            updateTransactions(accountId ?? "");
            updateAccount(accountId ?? "");
          }}
        />
      </div>
      <Tabs
        defaultValue={t.accountPage.tabs.transactions}
        className={"flex flex-col gap-4 2xl:gap-6 h-full overflow-hidden"}
      >
        <TabsList className={"sm:max-w-xs grid grid-cols-2"}>
          {Object.keys(t.accountPage.tabs).map((key) => (
            <TabsTrigger
              key={key}
              value={t.accountPage.tabs[key as keyof typeof t.accountPage.tabs]}
            >
              {t.accountPage.tabs[key as keyof typeof t.accountPage.tabs]}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          value={t.accountPage.tabs.transactions}
          className={"overflow-hidden m-0"}
        >
          <TransactionsView transactions={transactions} />
        </TabsContent>
        <TabsContent
          value={t.accountPage.tabs.chart}
          className={"overflow-hidden m-0 h-full"}
        >
          <AreaChart
            transactions={transactions}
            currency={account?.currency ?? "BYN"}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AccountPage;
