import { FC } from "react";

import { Api } from "@/api";
import { useRequest } from "@/lib/hooks/useRequest";
import CardsList from "@/components/layout/cards-list";
import PageLayout from "@/components/layout/page-layout";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAccountsSubscription } from "@/lib/hooks/useAccountsSubscription";

import CreateDeptModal from "./create-dept-modal";
import { DeptsBadgeSkeleton } from "./depts-badge";
import DeptCard, { DeptCardSkeleton } from "./dept-card";

const DeptsPage: FC = () => {
  const t = useTranslation();
  useAccountsSubscription();

  const { data: depts, run: updateDepts } = useRequest(Api.getDepts, undefined);

  return (
    <PageLayout
      title={t.depts.title}
      action={<CreateDeptModal onSuccess={updateDepts} />}
    >
      <div className={"flex gap-2 flex-wrap"}>
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
      </div>
      <CardsList
        data={depts}
        render={(dept, index) => <DeptCard key={index} dept={dept} updateDepts={updateDepts} />}
        skeletonComponent={<DeptCardSkeleton />}
        fallback={"You dont have any depts. Congratulations!"}
      />
    </PageLayout>
  );
};

export default DeptsPage;
