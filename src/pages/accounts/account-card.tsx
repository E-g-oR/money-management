import { FC } from "react";

import { Link } from "react-router-dom";

import { ROUTES } from "@/router";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TAccount } from "@/types/accounts/account";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface Props {
  account: TAccount;
}
const AccountCard: FC<Props> = ({ account }) => {
  const t = useTranslation()
  return (
    <Link
      to={ROUTES.accounts.account.builder(account.id)}
      className={"self-stretch"}
    >
      <Card className={"py-3 px-5 hover:bg-white/10 flex flex-col gap-2"}>
        <h2 className={"text-lg font-bold line-clamp-1 text-ellipsis"}>
          {account.name}
        </h2>
        <p className={"text-2xl flex-0"}>{t.format.currency(account.value, "BYN")}</p>
        <p className={"line-clamp-1 text-ellipsis text-muted-foreground"}>
          {account.description}
        </p>
      </Card>
    </Link>
  );
};

export default AccountCard;

export const AccountCardSkeleton: FC = () => (
  <Card
    className={
      "py-3 px-7 grid grid-cols-[120px_1fr] gap-5 items-center overflow-hidden h-full"
    }
  >
    <Skeleton className={"h-9 w-24"} />
    <div className={"flex flex-col flex-1 justify-evenly gap-2"}>
      <Skeleton className={"h-8 w-20"} />
      <Skeleton className={"h-6 w-52"} />
    </div>
  </Card>
);
