import { FC } from "react";

import { UseFormReturn } from "react-hook-form";

import { useTranslation } from "@/hooks/useTranslation";
import { getAccountsById, useDataStore } from "@/store/data";
import { ITransfer } from "@/features/transaction/transer-to-account-modal";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  form: UseFormReturn<ITransfer, unknown, undefined>;
  onSubmit: (data: ITransfer) => void;
  isLoading: boolean;
};
const ValueAndAccountForm: FC<Props> = ({ form, isLoading, onSubmit }) => {
  const t = useTranslation();
  const accountsById = useDataStore(getAccountsById);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-4"}
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
                  <Input
                    placeholder={"13"}
                    {...field}
                    type={"number"}
                    step={0.01}
                  />
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
          <Button type={"submit"} isLoading={isLoading}>
            {t.common.actions.pay}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ValueAndAccountForm;
