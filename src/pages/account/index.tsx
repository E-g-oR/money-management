import { FC } from "react";
import AccountPageHeader from "./account-page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TransactionCard from "./transaction-card";
import CardsList from "@/components/layout/cards-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";
import { useQuery } from "thin-backend-react";
import { query } from "thin-backend";

const AccountPage: FC = ({}) => {
  const { accountId } = useParams<"accountId">();

  const transactions = useQuery(
    query("transactions").where("accountId", accountId ?? "")
  );

  return (
    <>
      <AccountPageHeader accountId={accountId} />
      <div className={"flex justify-between items-center"}>
        <p>Your recent transactions</p>
        <Button size={"icon"} variant={"outline"}>
          <Plus />
        </Button>
      </div>
      <CardsList
        data={transactions}
        render={(_, i) => <TransactionCard key={i} transaction={_} />}
        skeletonComponent={<Skeleton />}
        fallback={"You dont have recent transactions on this account."}
      />
    </>
  );
};

export default AccountPage;
