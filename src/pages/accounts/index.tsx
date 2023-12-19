import { FC } from "react";
import PageLayout from "@/components/layout/page-layout";
import AccountCard, { AccountCardSkeleton } from "./account-card";
import { Input } from "@/components/ui/input";
import CardsList from "@/components/layout/cards-list";
import CreateAccountModal from "./create-account-modal";
import { useAccountsSubscription } from "@/lib/hooks/useAccountsSubscription";
import { firebaseApp } from "@/main";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const AccountsPage: FC = () => {
  // const accounts = useAccountsSubscription()
  const accounts = [];

  

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
