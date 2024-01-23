import { FC, useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { ArrowUpFromLine } from "lucide-react";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TAccount } from "@/types/accounts/account";
import { useRequestTrigger } from "@/lib/hooks/useRequest";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { getAccountsById, useDataStore } from "@/store/data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ITransfer {
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
const TransferToAccountModal: FC<Props> = ({ onSuccess, accountId }) => {
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
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <ArrowUpFromLine />
        </Button>
      </DialogTrigger>
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className={"flex gap-2"}>
              <FormField
                control={form.control}
                name={"value"}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter a value",
                  },
                  min: {
                    value: 0,
                    message: "Please enter a positive value",
                  },
                }}
                render={({ field }) => (
                  <FormItem className={"flex-1"}>
                    <FormLabel>{t.common.value}</FormLabel>
                    <FormControl>
                      <Input placeholder={"13"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"accountId"}
                render={({ field }) => (
                  <FormItem className={"flex-1"}>
                    <FormLabel>{t.common.account}</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select account"} />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {/* TODO: extract logic to separated functions */}
                        {Array.from(accountsById).map(([, account]) => (
                          <SelectItem value={account.id}>
                            {account.name}:{" "}
                            {t.format.currency(account.value, account.currency)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" isLoading={isLoading}>
                {t.common.actions.pay}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TransferToAccountModal;
