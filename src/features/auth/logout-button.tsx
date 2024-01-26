import { FC, useCallback, useContext } from "react";

import { LogOut } from "lucide-react";

import { Api } from "@/api";
import { Button } from "@/components/ui/button";
import { useRequestTrigger } from "@/hooks/useRequest";
import { useTranslation } from "@/hooks/useTranslation";
import { confirmModalContext } from "@/components/confirm-modal";

const LogoutButton: FC = () => {
  const t = useTranslation();
  const { run: signOut, isLoading } = useRequestTrigger(Api.signOut);

  const { confirm } = useContext(confirmModalContext);

  const confirmRequest = useCallback(() => {
    confirm({
      title: t.auth.logOutConfirmModal.title,
      description: t.auth.logOutConfirmModal.description,
      onConfirm: () => signOut(undefined),
    });
  }, [confirm, signOut, t]);

  return (
    <Button
      className={"sm:w-fit"}
      isLoading={isLoading}
      onClick={confirmRequest}
    >
      {t.common.actions.logOut} <LogOut className={"ml-2"} />
    </Button>
  );
};

export default LogoutButton;
