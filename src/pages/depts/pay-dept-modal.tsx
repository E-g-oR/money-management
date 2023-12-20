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

interface IPayDept {
  value: string;
  accountId: string;
}

interface Props {
  dept: TDept;
  onSuccess: () => void;
}
const PayDeptNodal: FC<Props> = ({ dept, onSuccess }) => {
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
        <Button>pay</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay dept</DialogTitle>
          <DialogDescription>{`Pay ${dept.name}`}</DialogDescription>
        </DialogHeader>
        <p>Needs to pay {dept.value - dept.coveredValue} to close the dept.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="value"
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
                  <FormItem className="flex-1">
                    <FormLabel>value</FormLabel>
                    <FormControl>
                      <Input placeholder="13" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"accountId"}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Account</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select account"} />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {Array.from(accountsById).map(([, account]) => (
                          <SelectItem value={account.id}>
                            {account.name}: {account.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PayDeptNodal;
