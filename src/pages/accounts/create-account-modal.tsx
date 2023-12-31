import { FC, useCallback, useState } from "react";

import { PlusIcon } from "lucide-react";
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
} from "@/components/ui/form";
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
}
type Props = {
  onSuccess: () => void;
};
const CreateAccountModal: FC<Props> = ({ onSuccess }) => {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: maybe extract all this logic into custom hoook
  const form = useForm<AccountCreate>({
    defaultValues: {
      account_name: "",
      account_description: "",
      account_value: "0",
    },
  });

  const onSubmit = useCallback(
    (data: AccountCreate) => {
      Api.createAccount({
        name: data.account_name,
        description: data.account_description,
        value: parseFloat(data?.account_value),
      }).then(() => {
        onSuccess();
        setIsOpen(false);
        form.reset();
      });
    },
    [form, onSuccess]
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
            <DialogFooter>
              <Button type={"submit"}>{t.common.actions.submit}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountModal;
