import { FC } from "react";
import AccountPageHeader from "./account-page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TransactionCard from "./transaction-card";
import CardsList from "@/components/layout/cards-list";

const AccountPage: FC = ({}) => {
  return (
    <>
      <AccountPageHeader />
      <div className={"flex justify-between items-center"}>
        <p>Your recent transactions</p>
        <Button size={"icon"} variant={"outline"}>
          <Plus />
        </Button>
      </div>
      <CardsList>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </CardsList>
    </>
  );
};

export default AccountPage;
