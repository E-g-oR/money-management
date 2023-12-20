import { FC, lazy, Suspense, useState } from "react";

import { PencilIcon } from "lucide-react";

import { Api } from "@/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequest } from "@/lib/hooks/useRequest";
import { useTranslation } from "@/lib/hooks/useTranslation";

const EditAccount = lazy(() => import("./edit-account"));

const AccountPageHeaderSkeleton: FC = () => (
  <div className={"flex flex-col gap-3"}>
    <Skeleton className={"w-32 h-10"} />
    <Skeleton className={"w-56 h-5"} />
    <Skeleton className={"w-24 h-7"} />
  </div>
);

interface Props {
  accountId: string | undefined;
}
const AccountPageHeader: FC<Props> = ({ accountId = "" }) => {
  const t = useTranslation();

  // TODO: доставать данные по аккаунту из стора по id
  const { data: account, run: updateAccount } = useRequest(
    Api.getAccount,
    accountId
  );

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
            onSuccess={() => updateAccount(accountId)}
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
