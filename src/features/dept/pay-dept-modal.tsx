import { FC, useCallback, useState } from "react";

import { useForm } from "react-hook-form";

import { Api } from "@/api";
import { TDept } from "@/types/depts/dept";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { ArrowUpFromLine } from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface IPayDept {
  value: string;
  accountId: string;
}

interface Props {
  dept: TDept;
  onSuccess: () => void;
}
export const PayDeptNodal: FC<Props> = ({ dept, onSuccess }) => {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const accountsById = useDataStore(getAccountsById);

  const form = useForm<IPayDept>();

  const onClose = useCallback(() => {
    form.reset();
    form.clearErrors();
    setOpen(false);
  }, [form]);

  const onSubmit = useCallback(
    (data: IPayDept) => {
      const account = accountsById.get(data.accountId);
      if (account) {
        Api.payDept(dept, parseFloat(data.value), account).then(() => {
          onSuccess();
          onClose();
        });
      }
    },
    [dept, accountsById, onSuccess, onClose]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <ArrowUpFromLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t.common.actions.pay} {dept.name}
          </DialogTitle>
          <DialogDescription>{dept.description}</DialogDescription>
        </DialogHeader>
        <p>
          Needs to pay{" "}
          <b>
            {t.format.currency(dept.value - dept.coveredValue, dept.currency)}
          </b>{" "}
          to close the dept.
        </p>
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
                        {Array.from(accountsById)
                          .filter(([, acc]) => acc.currency === dept.currency)
                          .map(([, account]) => (
                            <SelectItem value={account.id}>
                              {account.name}:{" "}
                              {t.format.currency(
                                account.value,
                                account.currency
                              )}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">{t.common.actions.pay}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PayDeptNodal;
