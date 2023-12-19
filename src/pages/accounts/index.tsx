import { FC } from "react";
import PageLayout from "@/components/layout/page-layout";
import AccountCard, { AccountCardSkeleton } from "./account-card";
import { Input } from "@/components/ui/input";
import CardsList from "@/components/layout/cards-list";
import CreateAccountModal from "./create-account-modal";
import { Api } from "@/api";
import { useRequest } from "@/lib/hooks/useRequest";


const AccountsPage: FC = () => {
  // const accounts = useAccountsSubscription()
  const {data: accounts, isLoading, run: updateAccountsList} = useRequest(Api.getAccounts)

  return (
    <PageLayout title={"Your accounts"} action={<CreateAccountModal onSuccess={updateAccountsList} />}>
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
