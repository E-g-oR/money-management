import { FC } from "react";
import { DeptCardSkeleton } from "./dept-card";
import { DeptsBadgeSkeleton } from "./depts-badge";
import { useTranslation } from "@/lib/hooks/useTranslation";

const DeptsPage: FC = () => {
  const t = useTranslation();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold">{t.depts.title}</h1>
      <div className="flex gap-2">
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
      </div>
      <div className="flex flex-col gap-3">
        <DeptCardSkeleton />
        <DeptCardSkeleton />
        <DeptCardSkeleton />
      </div>
    </div>
  );
};

export default DeptsPage;
