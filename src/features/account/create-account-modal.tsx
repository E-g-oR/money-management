import { FC, useCallback, useState } from "react";

import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { Currencies } from "@/types/currency";
import { Button } from "@/components/ui/button";
import { useRequestTrigger } from "@/lib/hooks/useRequest";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
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

interface AccountCreate {
  account_name: string;
  account_description?: string;
  account_value: string;
  account_currency: Currencies;
}
type Props = {
  onSuccess: () => void;
};
export const CreateAccountModal: FC<Props> = ({ onSuccess }) => {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  // TODO: maybe extract all this logic into custom hoook
  const form = useForm<AccountCreate>({
    defaultValues: {
      account_name: "",
      account_description: "",
      account_value: "0",
      account_currency: Currencies.BYN,
    },
  });

  const { run: createAccount, isLoading } = useRequestTrigger(
    Api.createAccount
  );

  const onSubmit = useCallback(
    (data: AccountCreate) => {
      createAccount({
        created_at: new Date(),
        name: data.account_name,
        description: data.account_description,
        value: parseFloat(data?.account_value),
        currency: data.account_currency,
      }).then(() => {
        onSuccess();
        setIsOpen(false);
        form.reset();
      });
    },
    [form, onSuccess, createAccount]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
          form.clearErrors();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size={"icon"} onClick={() => setIsOpen(true)}>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.accounts.createAccountModal.title}</DialogTitle>
          <DialogDescription>
            {t.accounts.createAccountModal.description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"flex flex-col gap-4"}
          >
            <FormField
              control={form.control}
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
              name={"account_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.common.name}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.accounts.createAccountModal.fields.name.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"account_description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.common.description}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        t.accounts.createAccountModal.fields.description
                          .placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-4">
              <FormField
                control={form.control}
                rules={{
                  min: {
                    value: 0,
                    message: t.common.fieldMessages.minValue(0),
                  },
                }}
                name={"account_value"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.common.value}</FormLabel>
                    <FormControl>
                      <Input placeholder={"0"} type={"number"} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"account_currency"}
                render={({ field }) => (
                  <FormItem className={"flex-1"}>
                    <FormLabel>{t.common.currency}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t.common.selectCurrency} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.keys(Currencies).map((curr) => (
                              <SelectItem value={curr} key={curr}>
                                {curr}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type={"submit"} isLoading={isLoading}>
                {t.common.actions.submit}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountModal;
