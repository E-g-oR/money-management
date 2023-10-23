import { FC, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Dept } from "thin-backend";


interface Props {
  dept: Dept;
}

const DeptCard: FC<Props> = ({ dept }) => {
  const t = useTranslation();
  const formattedValue = useMemo(
    () => t.format.currency(parseFloat(dept.value), "BYN"),
    [t.format.currency,]
  );

  return (
    <div className={"flex gap-4 py-2 px-5 border rounded-lg"}>
      <div className={"flex flex-col items-center flex-0 justify-between"}>
        <span className={"text-2xl"}>{formattedValue}</span>
        <Button>{t.common.actions.pay}</Button>
      </div>
      <div className={"flex-1"}>
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
            <Button variant={"destructive"} size={"icon"}>
              <TrashIcon className={"h-4 w-4"} />
            </Button>
          </div>
        </div>
        <div className={"flex flex-col items-center"}>
          <span>{t.format.currency(dept.coveredValue, "BYN")}</span>
          <Progress
            color={"primary"}
            value={(dept.coveredValue / dept.value) * 100}
          />
        </div>
      </div>
    </div>
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
            <Skeleton className={"w-48 h-5 mt-2"} />
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
