import { FC, useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { ArrowUpFromLine } from "lucide-react";

import { Api } from "@/api";
import { TDept } from "@/types/depts/dept";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { getAccountsById, useDataStore } from "@/store/data";
import ValueAndAccountForm from "@/components/value-and-account-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <Tooltip>
          <TooltipTrigger>
            <Button size={"icon"} onClick={() => setOpen(true)}>
              <ArrowUpFromLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent side={"bottom"}>
            <p>{t.common.actions.pay}</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t.common.actions.pay} {dept.name}
          </DialogTitle>
          <DialogDescription>{dept.description}</DialogDescription>
        </DialogHeader>
        <p>
          {t.depts.payModal.needsTo}{" "}
          <b>
            {t.format.currency(dept.value - dept.coveredValue, dept.currency)}
          </b>{" "}
          {t.depts.payModal.toCloseDept}.
        </p>
        <ValueAndAccountForm
          form={form}
          onSubmit={onSubmit}
          isLoading={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PayDeptNodal;
