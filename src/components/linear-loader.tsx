import { FC } from "react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const LinearLoader: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full h-2 rounded-lg bg-primary/20 overflow-hidden z-10 backdrop-blur shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      <div
        className={
          "absolute left-0 top-0 bg-primary rounded-lg h-full w-1/6 animate-wiggle"
        }
      />
    </div>
  );
};

export default LinearLoader;
