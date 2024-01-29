import { FC, useCallback } from "react";

import { Save, Undo2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Api } from "@/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AccountEdit {
  account_name: string;
  account_description?: string;
}
interface Props extends AccountEdit {
  id: string;
  cancel: () => void;
  onSuccess: () => void;
}

export const EditAccount: FC<Props> = ({
  account_name,
  account_description,
  id,
  cancel,
  onSuccess,
}) => {
  const t = useTranslation();
  const form = useForm<AccountEdit>({
    defaultValues: {
      account_description,
      account_name,
    },
  });

  const onSubmit = useCallback(
    (data: AccountEdit) => {
      Api.updateAccount(id, {
        name: data.account_name,
        description: data.account_description,
      }).then(() => {
        onSuccess();
        cancel();
      });
    },
    [id, cancel, onSuccess]
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={"flex gap-5  animate-in fade-in-0 zoom-in-95"}
    >
      <div className={"flex flex-col gap-2 flex-1"}>
        <Controller
          control={form.control}
          name={"account_name"}
          render={({ field }) => (
            <div>
              <Label htmlFor={"account_name"}>{t.common.name}</Label>
              <Input
                id={"account_name"}
                placeholder={
                  t.accounts.createAccountModal.fields.name.placeholder
                }
                {...field}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={"account_description"}
          render={({ field }) => (
            <div>
              <Label htmlFor={"account_description"}>
                {t.common.description}
              </Label>
              <Input
                id={"account_description"}
                placeholder={
                  t.accounts.createAccountModal.fields.description.placeholder
                }
                {...field}
              />
            </div>
          )}
        />
      </div>
      <div className={"flex flex-col gap-2"}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              type={"reset"}
              variant={"outline"}
              onClick={cancel}
            >
              <Undo2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent side={"left"}>
            <p>{t.common.actions.cancel}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} type={"submit"}>
              <Save />
            </Button>
          </TooltipTrigger>
          <TooltipContent side={"left"}>
            <p>{t.common.actions.save}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </form>
  );
};

export default EditAccount;
