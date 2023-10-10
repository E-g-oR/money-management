import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface AccountCreate {
  account_name: string;
  account_description?: string;
  account_value: number;
}

const CreateAccountModal: FC = () => {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: maybe extract all this logic into custom hoook
  const form = useForm<AccountCreate>({
    defaultValues: {
      account_name: "",
      account_description: "",
      account_value: 0,
    },
  });

  const onSubmit = useCallback(
    (data: AccountCreate) => {
      // console.log(data);
      setIsOpen(false);
      form.reset();
    },
    [form.reset]
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
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
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
            <Button type={"submit"}>{t.common.actions.submit}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountModal;
