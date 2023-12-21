import { FC, lazy, Suspense, useState } from "react";

import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { TAccount } from "@/types/accounts/account";

const EditAccount = lazy(() => import("./edit-account"));

const AccountPageHeaderSkeleton: FC = () => (
  <div className={"flex flex-col gap-3"}>
    <Skeleton className={"w-32 h-10"} />
    <Skeleton className={"w-56 h-5"} />
    <Skeleton className={"w-24 h-7"} />
  </div>
);

interface Props {
  account: TAccount | null;
  updateAccount: (accountId: string) => void;
}
const AccountPageHeader: FC<Props> = ({ account, updateAccount }) => {
  const t = useTranslation();

  const [isEdit, setIsEdit] = useState(false);

  return (
    <Suspense fallback={<AccountPageHeaderSkeleton />}>
      {account ? (
        isEdit ? (
          <EditAccount
            account_name={account?.name ?? ""}
            account_description={account?.description ?? ""}
            id={account?.id ?? ""}
            cancel={() => {
              setIsEdit(false);
            }}
            onSuccess={() => updateAccount(account.id)}
          />
        ) : (
          <div className={"flex justify-between"}>
            <div className={"flex flex-col gap-3"}>
              <h1 className={"text-4xl font-bold"}>{account?.name}</h1>
              <p className={"text-muted-foreground"}>{account?.description}</p>
              <p className={"text-3xl"}>
                {t.format.currency(account?.value, "BYN")}
              </p>
            </div>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setIsEdit(true)}
            >
              <PencilIcon />
            </Button>
          </div>
        )
      ) : (
        <AccountPageHeaderSkeleton />
      )}
    </Suspense>
  );
};

export default AccountPageHeader;
