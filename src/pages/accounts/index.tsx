import { FC } from "react";
import PageLayout from "@/components/layout/page-layout";
import AccountCard from "./account-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import CardsList from "@/components/layout/cards-list";

const AccountsPage: FC = () => {
  return (
    <PageLayout
      title="Your accounts"
      action={
        <Button size={"icon"}>
          <PlusIcon />
        </Button>
      }
    >
      <Input placeholder={"Search accounts"} />
      <CardsList>
        <AccountCard />
        <AccountCard />
        <AccountCard />
      </CardsList>
    </PageLayout>
  );
};

export default AccountsPage;
