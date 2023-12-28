import { FC } from "react";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { useRequest } from "@/lib/hooks/useRequest";
import CardsList from "@/components/layout/cards-list";
import PageLayout from "@/components/layout/page-layout";

import CreateAccountModal from "./create-account-modal";
import AccountCard, { AccountCardSkeleton } from "./account-card";
import { useTranslation } from "@/lib/hooks/useTranslation";

const AccountsPage: FC = () => {
  const t = useTranslation();
  const {
    data: accounts,
    run: updateAccountsList,
    isLoading,
  } = useRequest(Api.getAccounts, undefined);

  return (
    <PageLayout
      title={t.accounts.title}
      action={
        <CreateAccountModal onSuccess={() => updateAccountsList(undefined)} />
      }
    >
      <Input placeholder={"Search accounts"} />
      <CardsList
        isLoading={isLoading}
        data={accounts}
        render={(account) => <AccountCard key={account.id} account={account} />}
        skeletonComponent={<AccountCardSkeleton />}
        fallback={t.accounts.noAccountsFallback}
      />
    </PageLayout>
  );
};

export default AccountsPage;
