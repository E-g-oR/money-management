import { FC } from "react";

import { Api } from "@/api";
import { useRequest } from "@/lib/hooks/useRequest";
import CardsList from "@/components/layout/cards-list";
import PageLayout from "@/components/layout/page-layout";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { CreateDeptModal, DeptCard } from "@/features/dept";
import { DeptCardSkeleton } from "@/features/dept/dept-card";

const DeptsPage: FC = () => {
  const t = useTranslation();
  const { run: updateAccounts } = useRequest(Api.getAccounts, undefined);
  const {
    data: depts,
    run: updateDepts,
    isLoading,
  } = useRequest(Api.getDepts, undefined);

  return (
    <PageLayout
      title={t.depts.title}
      action={
        <CreateDeptModal
          onSuccess={() => {
            updateDepts(undefined);
          }}
        />
      }
    >
      {/* <div className={"flex gap-2 flex-wrap"}>
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
      </div> */}
      <CardsList
        isLoading={isLoading}
        data={depts}
        render={(dept, index) => (
          <DeptCard
            key={index}
            dept={dept}
            updateDepts={() => {
              updateDepts(undefined);
              updateAccounts(undefined);
            }}
          />
        )}
        skeletonComponent={<DeptCardSkeleton />}
        fallback={t.depts.noDeptsFallback}
      />
    </PageLayout>
  );
};

export default DeptsPage;
