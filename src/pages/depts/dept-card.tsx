import { FC, useContext, useMemo } from "react";

import { Api } from "@/api";
import { TDept } from "@/types/depts/dept";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { confirmModalContext } from "@/components/confirm-modal";

import { calcProgress } from "./utils";
import PayDeptNodal from "./pay-dept-modal";
import { MoreVertical } from "lucide-react";

interface Props {
  dept: TDept;
  updateDepts: () => void;
}

const DeptCard: FC<Props> = ({ dept, updateDepts }) => {
  const t = useTranslation();
  const { confirm } = useContext(confirmModalContext);
  const formattedValue = useMemo(
    () => t.format.currency(dept.value, "BYN"),
    [t.format, dept.value]
  );

  return (
    <Card className={"flex flex-col gap-2 py-3 px-4"}>
      <div className="flex gap-2 justify-between">
        <h2 className={"text-lg font-semibold line-clamp-1 text-ellipsis"}>
          {dept.name}
        </h2>
        <span className={"text-xl"}>{formattedValue}</span>
      </div>
      <div className={"flex gap-2 justify-between items-center"}>
        <span className={"line-clamp-1 text-ellipsis text-muted-foreground"}>{dept.description}</span>
        <div className="flex gap-2">
          <PayDeptNodal
            dept={dept}
            onSuccess={() => {
              updateDepts();
            }}
          />
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {}}
            >
              <MoreVertical/>
            </Button>
        </div>
      </div>
      <div className={"flex flex-col items-center"}>
          <span>{t.format.currency(dept.coveredValue, "BYN")}</span>
          <Progress
            color={"primary"}
            value={calcProgress(dept.value, dept.coveredValue)}
          />
        </div>
      {/* <div className={"flex flex-col items-center flex-0 justify-between"}>
        <PayDeptNodal
          dept={dept}
          onSuccess={() => {
            updateDepts();
          }}
        />
      </div> */}
      {/* <div className={"flex-1"}>
        <div className={"flex items-center gap-5"}>
          <div className={"flex-1"}>
            <h2 className={"text-lg font-semibold line-clamp-1 text-ellipsis"}>
              {dept.name}
            </h2>
            <span className={"line-clamp-1 text-ellipsis"}>
              {dept.description}
            </span>
          </div>
          <div className={"flex gap-2"}>
            <Button variant={"outline"} size={"icon"}>
              <Pencil1Icon className={"h-4 w-4"} />
            </Button>
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => {
                confirm({
                  title: "Delete dept",
                  description:
                    "After deleting dept you wont be able to recover it.",
                  onConfirm: async () => {
                    await Api.deleteDept(dept.id);
                    updateDepts();
                  },
                });
              }}
            >
              <TrashIcon className={"h-4 w-4"} />
            </Button>
          </div>
        </div>
        <div className={"flex flex-col items-center"}>
          <span>{t.format.currency(dept.coveredValue, "BYN")}</span>
          <Progress
            color={"primary"}
            value={calcProgress(dept.value, dept.coveredValue)}
          />
        </div>
      </div> */}
    </Card>
  );
};

export default DeptCard;

export const DeptCardSkeleton: FC = () => {
  const t = useTranslation();
  return (
    <Card className={"flex gap-4 py-2 px-5"}>
      <div className={"flex flex-col items-center flex-0 justify-between"}>
        <Skeleton className={"w-16 h-7"} />
        <Button disabled>{t.common.actions.pay}</Button>
      </div>
      <div className={"flex-1"}>
        <div className={"flex items-center gap-5"}>
          <div className={"flex-1"}>
            <Skeleton className={"w-24 h-7"} />
            <Skeleton className={"mw-48 h-5 mt-2"} />
          </div>
          <div className={"flex gap-2"}>
            <Button variant={"outline"} size={"icon"} disabled>
              <Pencil1Icon className={"h-4 w-4"} />
            </Button>
            <Button variant={"destructive"} size={"icon"} disabled>
              <TrashIcon className={"h-4 w-4"} />
            </Button>
          </div>
        </div>
        <div className={"flex flex-col items-center mt-2"}>
          <Skeleton className={"w-12 h-6"} />
          <Skeleton className={"w-full h-3 mt-2"} />
        </div>
      </div>
    </Card>
  );
};
