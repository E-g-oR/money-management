import { FC } from "react";
import PageLayout from "@/components/layout/page-layout";
import AccountCard, { AccountCardSkeleton } from "./account-card";
import { Input } from "@/components/ui/input";
import CardsList from "@/components/layout/cards-list";
import CreateAccountModal from "./create-account-modal";
import { useQuery } from "thin-backend-react";
import { query } from "thin-backend";

const AccountsPage: FC = () => {
  const accounts = useQuery(query("accounts").orderByDesc("updatedAt"));

  return (
    <PageLayout title={"Your accounts"} action={<CreateAccountModal />}>
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
