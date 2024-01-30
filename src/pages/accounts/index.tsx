import { FC } from "react";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { useRequest } from "@/hooks/useRequest";
import CardsList from "@/components/layout/cards-list";
import PageLayout from "@/components/layout/page-layout";
import { useTranslation } from "@/hooks/useTranslation";
import {
  AccountCard,
  AccountCardSkeleton,
  CreateAccountModal,
} from "@/features/account";
import { getAccountsById, getIsAccountsLoading, useDataStore } from "@/store/data";

const AccountsPage: FC = () => {
  const t = useTranslation();
  const accountsById = useDataStore(getAccountsById)
  const isAccountsLoading = useDataStore(getIsAccountsLoading)
  const {
    run: updateAccountsList,
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
        isLoading={isAccountsLoading}
        data={Array.from(accountsById.values())}
        render={(account) => <AccountCard key={account.id} account={account} />}
        skeletonComponent={<AccountCardSkeleton />}
        fallback={t.accounts.noAccountsFallback}
      />
    </PageLayout>
  );
};

export default AccountsPage;
