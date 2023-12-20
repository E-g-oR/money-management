import { FC } from "react";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { useRequest } from "@/lib/hooks/useRequest";
import CardsList from "@/components/layout/cards-list";
import PageLayout from "@/components/layout/page-layout";

import CreateAccountModal from "./create-account-modal";
import AccountCard, { AccountCardSkeleton } from "./account-card";

const AccountsPage: FC = () => {
  const { data: accounts, run: updateAccountsList } = useRequest(
    Api.getAccounts,
    undefined
  );

  return (
    <PageLayout
      title={"Your accounts"}
      action={<CreateAccountModal onSuccess={() => updateAccountsList(undefined)} />}
    >
      <Input placeholder={"Search accounts"} />
      <CardsList
        data={accounts}
        render={(account) => <AccountCard key={account.id} account={account} />}
        skeletonComponent={<AccountCardSkeleton />}
        fallback={"You dont have any accounts yet."}
      />
    </PageLayout>
  );
};

export default AccountsPage;
