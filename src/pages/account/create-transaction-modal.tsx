import { FC, useCallback, useState } from "react";

import { CalendarIcon, Plus } from "lucide-react";
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
import {
  TCreateTransaction,
  TransactionType,
} from "@/types/transactions/transaction";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

// interface CreateTransaction {
//   title: string;
//   description?: string;
//   type: TransactionType;
//   value: string;
//   date: Date;
// }
interface Props {
  accountId: string | undefined;
  onSuccess: () => void;
}
const CreateTransactionModal: FC<Props> = ({ accountId = "", onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TCreateTransaction>({
    defaultValues: {
      description: "",
      title: "",
      type: TransactionType.Expense,
      value: 0,
      created_at: new Date(),
    },
  });

  const t = useTranslation();

  const onClose = useCallback(() => {
    setIsOpen(false);
    form.reset();
    form.clearErrors();
  }, [setIsOpen, form]);

  const onSubmit = useCallback(
    (data: TCreateTransaction) => {
      console.log(data.created_at);

      Api.createTransactionAndUpdateAccount({
        ...data,
        value: parseFloat(data.value.toString()),
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
                    value: 0.001,
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
              <FormField
                control={form.control}
                name={"created_at"}
                render={({ field }) => (
                  <FormItem className={"flex-1"}>
                    <FormLabel>{"Выберите дату"}</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
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
