import { Card } from "@/components/ui/card";
import { FC } from "react";
import { Account } from "thin-backend";

interface Props {
  account: Account;
}
const AccountCard: FC<Props> = ({ account }) => {
  return (
    <Card
      className={
        "py-3 px-7 flex gap-5 items-center bg-gradient-to-r from-slate-500/20 to-slate-800/10"
      }
    >
      <span className={"text-3xl flex-0"}>{account.value} $</span>
      {/* TODO: show account difference on last month */}
      <div className="flex flex-col flex-1 justify-evenly">
        <h2 className={"text-2xl font-bold"}>{account.name}</h2>
        <p>{account.description}</p>
      </div>
    </Card>
  );
};

export default AccountCard;
