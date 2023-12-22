import { FC } from "react";

import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  /**
   * from 0 to 100 with step by 10
   */
  opacity?: number;
};
const BgCircle: FC<Props> = ({
  right,
  bottom,
  top,
  left,
  size = 32,
  opacity = 50,
}) => {
  return (
    <div
      className={cn(
        `absolute w-${size} h-${size} bg-primary/${opacity} rounded-full blur-3xl -z-10`,
        left !== undefined && `left-${left}`,
        right !== undefined && `right-${right}`,
        top !== undefined && `top-${top}`,
        bottom !== undefined && `bottom-${bottom}`
      )}
    />
  );
};

export default BgCircle;
