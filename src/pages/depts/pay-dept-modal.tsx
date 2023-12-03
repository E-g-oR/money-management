import { Api } from "@/api";
import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAccountsById, useDataStore } from "@/store/data";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Dept } from "thin-backend";

interface IPayDept {
  value: string;
  accountId: string;
}

interface Props {
  dept: Dept;
}
const PayDeptNodal: FC<Props> = ({ dept }) => {
  const [open, setOpen] = useState(false);

  const accountsById = useDataStore(getAccountsById);

  const form = useForm<IPayDept>();

  const onSubmit = useCallback(
    (data: IPayDept) => {
      const account = accountsById.get(data.accountId);
      if (account) {
        Api.depts.pay(dept, parseFloat(data.value), account);
        setOpen(false);
      }
    },
    [dept, accountsById]
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
        <p>Needs to pay {parseFloat(dept.value) - parseFloat(dept.coveredValue)} to close the dept.</p>
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

// const;
