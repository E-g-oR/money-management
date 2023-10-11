import { FC, Suspense, lazy, useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useParams } from "react-router-dom";
import { query } from "thin-backend";
import { useQuery } from "thin-backend-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

const EditAccount = lazy(() => import("./edit-account"));

const AccountPageHeaderSkeleton: FC = () => (
  <div className={"flex flex-col gap-3"}>
    <Skeleton className={"w-32 h-10"} />
    <Skeleton className={"w-56 h-5"} />
    <Skeleton className={"w-24 h-7"} />
  </div>
);

const AccountPageHeader: FC = () => {
  const t = useTranslation();
  const { accountId } = useParams<"accountId">();
  const account = useQuery(query("accounts").where("id", accountId ?? ""));
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Suspense fallback={<AccountPageHeaderSkeleton />}>
      {account?.[0] ? (
        isEdit ? (
          <EditAccount
            account_name={account?.[0].name ?? ""}
            account_description={account?.[0].description ?? ""}
            id={account?.[0].id ?? ""}
            cancel={() => setIsEdit(false)}
          />
        ) : (
          <div className={"flex justify-between"}>
            <div className={"flex flex-col gap-3"}>
              <h1 className={"text-4xl font-bold"}>{account?.[0].name}</h1>
              <p className="text-muted-foreground">
                {account?.[0].description}
              </p>
              <p className={"text-3xl"}>
                {t.format.currency(parseFloat(account?.[0].value), "BYN")}
              </p>
            </div>
            <Button size={"icon"} onClick={() => setIsEdit(true)}>
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
