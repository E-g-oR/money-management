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
  DialogFooter,
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
import { useRequestTrigger } from "@/lib/hooks/useRequest";

interface Props {
  accountId: string | undefined;
  onSuccess: () => void;
}
const CreateTransactionModal: FC<Props> = ({ accountId = "", onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { run: createTransaction, isLoading: isCreatingTransaction } =
    useRequestTrigger(Api.createTransactionAndUpdateAccount);

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
      const now = new Date();
      data.created_at.setHours(now.getHours());
      data.created_at.setMinutes(now.getMinutes());

      createTransaction({
        ...data,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: parseFloat(data.value),
        account_id: accountId,
      }).then(() => {
        onSuccess();
        onClose();
      });
    },
    [onClose, accountId, onSuccess, createTransaction]
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
        <Button onClick={() => setIsOpen(true)} size={"icon"} isLoading={isCreatingTransaction}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t.accountPage.createTransactionModal.title}
          </DialogTitle>
          <DialogDescription>
            {t.accountPage.createTransactionModal.description}
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
                    <Input
                      placeholder={
                        t.accountPage.createTransactionModal.fields.title
                          .placeholder
                      }
                      {...field}
                    />
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
                    <Input
                      placeholder={
                        t.accountPage.createTransactionModal.fields.description
                          .placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className={"flex gap-3 flex-wrap"}>
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
                    <FormLabel>{t.common.transactionType}</FormLabel>
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
                    <FormLabel>{t.common.actions.pickDate}</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "min-w-[200px] w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t.common.actions.pickDate}</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className={"w-auto p-0"}
                          align={"start"}
                        >
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
            <DialogFooter>
              <Button type={"submit"} isLoading={isCreatingTransaction}>
                {t.common.actions.submit}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionModal;
