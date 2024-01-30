import { FC, useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { ArrowUpFromLine } from "lucide-react";

import { Api } from "@/api";
import { Button } from "@/components/ui/button";
import { TAccount } from "@/types/accounts/account";
import { useRequestTrigger } from "@/hooks/useRequest";
import { useTranslation } from "@/hooks/useTranslation";
import { getAccountsById, useDataStore } from "@/store/data";
import ValueAndAccountForm from "@/components/value-and-account-form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface ITransfer {
  value: string;
  accountId: string;
}

export type TTransferToAnotherAccount = {
  value: number;
  fromAccountId: TAccount;
  toAccountId: TAccount;
};

type Props = {
  onSuccess: () => void;
  accountId: string;
};
export const TransferToAccountModal: FC<Props> = ({ onSuccess, accountId }) => {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const accountsById = useDataStore(getAccountsById);

  const form = useForm<ITransfer>();

  const { run: transferToAnotherAccount, isLoading } = useRequestTrigger(
    Api.transferToAnotherAccount
  );

  const onClose = useCallback(() => {
    form.reset();
    form.clearErrors();
    setIsOpen(false);
  }, [form]);

  const onSubmit = useCallback(
    (data: ITransfer) => {
      const accountFrom = accountsById.get(accountId);
      const accountTo = accountsById.get(data.accountId);
      if (accountFrom && accountTo) {
        transferToAnotherAccount({
          value: parseFloat(data.value),
          fromAccountId: accountFrom,
          toAccountId: accountTo,
        }).then(() => {
          onSuccess();
          onClose();
        });
      }
    },
    [accountsById, onSuccess, onClose, accountId, transferToAnotherAccount]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          onClose();
        }
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsOpen(true)}
          >
            <ArrowUpFromLine />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t.accountPage.transeferToAnotherAccountModal.tooltip}</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t.accountPage.transeferToAnotherAccountModal.title}
          </DialogTitle>
          <DialogDescription>
            {t.accountPage.transeferToAnotherAccountModal.description}
          </DialogDescription>
        </DialogHeader>
        {/* TODO: избавиться от повторения. Точно такой же код в PayDeptModal. Нужно вынести эту разметку в отдельный компонент. */}
        <ValueAndAccountForm
          form={form}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TransferToAccountModal;
