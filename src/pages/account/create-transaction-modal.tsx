import { FC, useCallback, useState } from "react";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks/useTranslation";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/types/transactions/transaction";

interface CreateTransaction {
  title: string;
  description?: string;
  type: TransactionType;
  value: string;
}
interface Props {
  accountId: string | undefined;
  onSuccess: () => void;
}
const CreateTransactionModal: FC<Props> = ({ accountId = "", onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<CreateTransaction>({defaultValues: {
    description: "",
    title: "",
    type: TransactionType.Expense,
    value: "0"
  }});

  const t = useTranslation();

  const onClose = useCallback(() => {
    setIsOpen(false);
    form.reset();
    form.clearErrors();
  }, [setIsOpen, form]);

  const onSubmit = useCallback(
    (data: CreateTransaction) => {
      Api.createTransactionAndUpdateAccount({
        ...data,
        value: parseFloat(data.value),
        account_id: accountId,
      }).then(() => {
        onSuccess();
        onClose();
      });
    },
    [onClose, accountId, onSuccess]
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
        <Button onClick={() => setIsOpen(true)} size={"icon"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.accounts.createAccountModal.title}</DialogTitle>
          <DialogDescription>
            {t.accounts.createAccountModal.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className={"flex flex-col gap-3"}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name={"title"}
              rules={{
                required: {
                  value: true,
                  message: t.common.fieldMessages.required,
                },
                minLength: {
                  value: 5,
                  message: t.common.fieldMessages.minLength(5),
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.common.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={"Grocery"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.common.description}</FormLabel>
                  <FormControl>
                    <Input placeholder={"Coke, eggs, pasta"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className={"flex gap-3"}>
              <FormField
                control={form.control}
                name={"type"}
                rules={{
                  required: {
                    value: true,
                    message: t.common.fieldMessages.required,
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={"Select type of transaction"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />

                      <SelectContent>
                        <SelectItem value={TransactionType.Income}>
                          Income
                        </SelectItem>
                        <SelectItem value={TransactionType.Expense}>
                          Expense
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"value"}
                rules={{
                  min: {
                    value: 0,
                    message: t.common.fieldMessages.minValue(0),
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t.common.value}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"23,70"}
                        type={"number"}
                        step={"any"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type={"submit"} className={"self-end"}>
              {t.common.actions.submit}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionModal;
