import { FC, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useForm } from "react-hook-form";
import { Api } from "@/api";

interface CreateDept {
  name: string;
  description?: string;
  value: string;
  coveredValue: string;
}

const CreateDeptModal: FC = () => {
  const t = useTranslation();
  const form = useForm<CreateDept>({
    defaultValues: {
      value: "0",
      coveredValue: "0",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
    form.reset();
    form.clearErrors();
  }, [form, setIsOpen]);

  const onSubmit = useCallback(
    async (data: CreateDept) => {
      Api.depts.create(data);
      onClose();
    },
    [onClose]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          setIsOpen(true);
        } else onClose();
      }}
    >
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.depts.createModal.title}</DialogTitle>
          <DialogDescription>
            {t.depts.createModal.description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
            <FormField
              control={form.control}
              name={"name"}
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
                    <Input
                      placeholder={
                        t.depts.createModal.fields.namePlaceholder
                      }
                      {...field}
                    />
                  </FormControl>
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
            <div className={"flex gap-5"}>
              <FormField
                control={form.control}
                name={"value"}
                rules={{
                  required: {
                    value: true,
                    message: t.common.fieldMessages.required,
                  },
                  min: {
                    value: 0,
                    message: t.common.fieldMessages.minValue(0),
                  },
                }}
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
                name={"coveredValue"}
                rules={{
                  min: {
                    value: 0,
                    message: t.common.fieldMessages.minValue(0),
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.common.coveredValue}</FormLabel>
                    <FormControl>
                      <Input placeholder={"0"} type={"number"} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type={"submit"}>{t.common.actions.submit}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeptModal;
