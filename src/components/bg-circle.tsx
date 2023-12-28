import { FC } from "react";

import { cn } from "@/lib/utils";

type Props = {
  className: string;
};
const BgCircle: FC<Props> = ({ className }) => {
  return (
    <div className={cn(`absolute bg-primary/50 rounded-full blur-3xl -z-10`, className)} />
  );
};

export default BgCircle;
