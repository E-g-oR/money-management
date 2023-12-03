import { FC } from "react";
import DeptCard, { DeptCardSkeleton } from "./dept-card";
import { DeptsBadgeSkeleton } from "./depts-badge";
import { useTranslation } from "@/lib/hooks/useTranslation";
import PageLayout from "@/components/layout/page-layout";
import CardsList from "@/components/layout/cards-list";
import { useQuery } from "thin-backend-react";
import { query } from "thin-backend";
import CreateDeptModal from "./create-dept-modal";
import { useAccountsSubscription } from "@/lib/hooks/useAccountsSubscription";

const DeptsPage: FC = () => {
  const t = useTranslation();
  useAccountsSubscription();
  
  const depts = useQuery(
    query("depts").orderByDesc("value").orderByDesc("coveredValue")
  );
  
  return (
    <PageLayout title={t.depts.title} action={<CreateDeptModal />}>
      <div className={"flex gap-2 flex-wrap"}>
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
        <DeptsBadgeSkeleton />
      </div>
      <CardsList
        data={depts}
        render={(dept, index) => <DeptCard key={index} dept={dept} />}
        skeletonComponent={<DeptCardSkeleton />}
        fallback={"You dont have any depts. Congratulations!"}
      />
    </PageLayout>
  );
};

export default DeptsPage;
