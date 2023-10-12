import { FC } from "react";
import PageLayout from "@/components/layout/page-layout";
import AccountCard from "./account-card";
import { Input } from "@/components/ui/input";
import CardsList from "@/components/layout/cards-list";
import CreateAccountModal from "./create-account-modal";
import { useQuery } from "thin-backend-react";
import { query } from "thin-backend";
import { Skeleton } from "@/components/ui/skeleton";

const AccountsPage: FC = () => {
  const accounts = useQuery(query("accounts"));

  return (
    <PageLayout title={"Your accounts"} action={<CreateAccountModal />}>
      <Input placeholder={"Search accounts"} />
      <CardsList
        data={accounts}
        render={(account) => <AccountCard key={account.id} account={account} />}
        skeletonComponent={<Skeleton />}
        fallback={"You dont have any accounts yet."}
      />
    </PageLayout>
  );
};

export default AccountsPage;
