import {
  FC,
  useMemo,
  // useContext,
} from "react";

import { TDept } from "@/types/depts/dept";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";

import PayDeptNodal from "./pay-dept-modal";
import { ArrowUpFromLine, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import Show from "@/components/show";
import { calcProgress } from "./utils";

interface Props {
  dept: TDept;
  updateDepts: () => void;
}

export const DeptCard: FC<Props> = ({ dept, updateDepts }) => {
  const t = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { confirm } = useContext(confirmModalContext);

  const isClosed = useMemo(
    () => dept.coveredValue === dept.value,
    [dept.coveredValue, dept.value]
  );

  return (
    <Card
      className={cn("flex flex-col gap-2 py-3 px-4", isClosed && "saturate-50 brightness-75")}
    >
      <div className={"flex gap-2 justify-between"}>
        <h2 className={"text-lg font-semibold line-clamp-1 text-ellipsis"}>
          {dept.name}
        </h2>
        <span className={"text-xl"}>
          {t.format.currency(dept.value, dept.currency)}
        </span>
      </div>
      <div className={"flex gap-2 justify-between items-center"}>
        <span className={"line-clamp-1 text-ellipsis text-muted-foreground"}>
          {dept.description}
        </span>
        <div className={"flex gap-2"}>
          <Show when={!isClosed}>
            <PayDeptNodal
              dept={dept}
              onSuccess={() => {
                updateDepts();
              }}
            />
          </Show>
          <Button variant={"ghost"} size={"icon"} onClick={() => {}}>
            <MoreVertical />
          </Button>
        </div>
      </div>
      <div className={"flex flex-col items-center"}>
        <span>{t.format.currency(dept.coveredValue, dept.currency)}</span>
        <Progress
          color={"primary"}
          value={calcProgress(dept.value, dept.coveredValue)}
        />
      </div>
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
  return (
    <Card className={"flex flex-col gap-2 py-3 px-4"}>
      <div className={"flex gap-2 justify-between"}>
        <Skeleton className={"h-7 w-36"} />
        <Skeleton className={"h-7 w-24"} />
      </div>
      <div className={"flex gap-2 justify-between items-center"}>
        <Skeleton className={"h-6 w-44"} />
        <div className={"flex gap-2"}>
          <Button size={"icon"} disabled>
            <ArrowUpFromLine />
          </Button>
          <Button variant={"ghost"} size={"icon"} onClick={() => {}} disabled>
            <MoreVertical />
          </Button>
        </div>
      </div>
      <div className={"flex flex-col items-center gap-2"}>
        <Skeleton className={"h-6 w-16"} />
        <Progress color={"primary"} value={40} />
      </div>
    </Card>
  );
};
