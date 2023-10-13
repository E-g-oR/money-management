import { FC } from "react";
import { DeptCardSkeleton } from "./dept-card";
import { DeptsBadgeSkeleton } from "./depts-badge";
import { useTranslation } from "@/lib/hooks/useTranslation";
import PageLayout from "@/components/layout/page-layout";
import CardsList from "@/components/layout/cards-list";

const DeptsPage: FC = () => {
  const t = useTranslation();
  return (
    <PageLayout title={t.depts.title} >
      <div className={"flex gap-2 flex-wrap"}>
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
      </div>
      <CardsList >
        <DeptCardSkeleton />
        <DeptCardSkeleton />
        <DeptCardSkeleton />
      </CardsList>
    </PageLayout>
  );
};

export default DeptsPage;
