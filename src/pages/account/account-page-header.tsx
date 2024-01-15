import { FC, lazy, Suspense, useCallback, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { PencilIcon, Trash } from "lucide-react";

import { Api } from "@/api";
import { ROUTES } from "@/router";
import Show from "@/components/show";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TAccount } from "@/types/accounts/account";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { confirmModalContext } from "@/components/confirm-modal";

const EditAccount = lazy(() => import("./edit-account"));

const AccountPageHeaderSkeleton: FC = () => (
  <div className={"flex flex-col gap-3 animate-in fade-in-0 zoom-in-95"}>
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
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const { confirm } = useContext(confirmModalContext);

  const deleteAccount = useCallback(() => {
    Api.deleteAccount(account?.id ?? "").then(() =>
      navigate(ROUTES.accounts.index.path)
    );
  }, [navigate, account?.id]);

  return (
    <Suspense fallback={<AccountPageHeaderSkeleton />}>
      <Show when={!!account} fallback={<AccountPageHeaderSkeleton />}>
        <Show
          when={!isEdit}
          fallback={
            <EditAccount
              account_name={account?.name ?? ""}
              account_description={account?.description ?? ""}
              id={account?.id ?? ""}
              cancel={() => {
                setIsEdit(false);
              }}
              onSuccess={() => updateAccount(account!.id)}
            />
          }
        >
          <div
            className={"flex justify-between animate-in fade-in-0 zoom-in-95"}
          >
            <div className={"flex flex-col gap-3"}>
              <h1 className={"text-4xl font-bold"}>{account?.name}</h1>
              <p className={"text-muted-foreground"}>{account?.description}</p>
              <p className={"text-3xl"}>
                {t.format.currency(account?.value ?? 0, account?.currency)}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsEdit(true)}
              >
                <PencilIcon />
              </Button>
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() =>
                  confirm({
                    // TODO: add translation to confirm dialog
                    title: "Delete account",
                    description: "Are you sure about that ?",
                    onConfirm: deleteAccount,
                  })
                }
              >
                <Trash />
              </Button>
            </div>
          </div>
        </Show>
      </Show>
    </Suspense>
  );
};

export default AccountPageHeader;
