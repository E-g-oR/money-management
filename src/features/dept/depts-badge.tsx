import { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  text: string;
  value: string;
}
export const DeptsBadge: FC<Props> = ({ text, value }) => {
  return (
    <div className="flex flex-col items-center font-bold bg-primary-foreground rounded py-2 px-5">
      <span>{text}</span>
      <span>{value}</span>
    </div>
  );
};

export default DeptsBadge;

export const DeptsBadgeSkeleton: FC = () => (
  <div className="flex flex-col items-center bg-primary-foreground rounded py-2 px-5">
    <Skeleton className="w-40 h-5" />
    <Skeleton className="w-10 h-5 mt-2" />
  </div>
);
