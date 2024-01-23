import { FC, useCallback, useState } from "react";

import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { Currencies } from "@/types/currency";
import { Button } from "@/components/ui/button";
import { useRequestTrigger } from "@/hooks/useRequest";
import { useTranslation } from "@/hooks/useTranslation";
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

interface CreateDept {
  name: string;
  description: string;
  value: string;
  coveredValue: string;
  currency: Currencies;
}

type Props = {
  onSuccess: () => void;
};
export const CreateDeptModal: FC<Props> = ({ onSuccess }) => {
  const t = useTranslation();
  const form = useForm<CreateDept>({
    defaultValues: {
      value: "0",
      coveredValue: "0",
      description: "",
      name: "",
      currency: Currencies.BYN,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const { run: createDept, isLoading } = useRequestTrigger(Api.createDept);

  const onClose = useCallback(() => {
    setIsOpen(false);
    form.reset();
    form.clearErrors();
  }, [form, setIsOpen]);

  const onSubmit = useCallback(
    async (data: CreateDept) => {
      createDept({
        ...data,
        created_at: new Date(),
        coveredValue: parseFloat(data.coveredValue),
        value: parseFloat(data.value),
      }).then(() => {
        onSuccess();
        onClose();
      });
    },
    [onClose, onSuccess, createDept]
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"flex flex-col gap-4"}
          >
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
                      placeholder={t.depts.createModal.fields.namePlaceholder}
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
            <div className={"flex gap-5 justify-between"}>
              <FormField
                control={form.control}
                name={"value"}
                rules={{
                  required: {
                    value: true,
                    message: t.common.fieldMessages.required,
                  },
                  min: {
                    value: 0.001,
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
              <FormField
                control={form.control}
                name={"currency"}
                render={({ field }) => (
                  <FormItem className={"flex-1 w-full"}>
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

export default CreateDeptModal;
