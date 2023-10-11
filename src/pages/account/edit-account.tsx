import { Api } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Save, Undo2 } from "lucide-react";
import { FC, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

interface AccountEdit {
  account_name: string;
  account_description?: string;
}
interface Props extends AccountEdit {
  id: string;
  cancel: () => void;
}
const EditAccount: FC<Props> = ({
  account_name,
  account_description,
  id,
  cancel,
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
      Api.account
        .update(id, {
          name: data.account_name,
          description: data.account_description,
        })
        .then(cancel);
    },
    [id, cancel]
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={"flex gap-5 items-center"}
    >
      <div className={"flex flex-col gap-2 flex-1"}>
        <Controller
          control={form.control}
          name={"account_name"}
          render={({ field }) => (
            <div>
              <Label>{t.common.name}</Label>
              <Input
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
              <Label>{t.common.description}</Label>
              <Input
                placeholder={
                  t.accounts.createAccountModal.fields.description.placeholder
                }
                {...field}
              />
            </div>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button size={"icon"} type="submit">
          <Save />{" "}
        </Button>
        <Button size={"icon"} type="reset" variant={"outline"} onClick={cancel}>
          <Undo2 />
        </Button>
      </div>
    </form>
  );
};

export default EditAccount;
