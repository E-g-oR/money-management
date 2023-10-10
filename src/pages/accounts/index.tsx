import { FC } from "react";
import PageLayout from "@/components/layout/page-layout";
import AccountCard from "./account-card";
import { Input } from "@/components/ui/input";
import CardsList from "@/components/layout/cards-list";
import CreateAccountModal from "./create-account-modal";
import { useQuery } from "thin-backend-react";
import { query } from "thin-backend";

const AccountsPage: FC = () => {
  const accounts = useQuery(query("accounts"));

  return (
    <PageLayout title={"Your accounts"} action={<CreateAccountModal />}>
      <Input placeholder={"Search accounts"} />
      <CardsList>
        {accounts?.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </CardsList>
    </PageLayout>
  );
};

export default AccountsPage;
