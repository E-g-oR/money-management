import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  when: boolean;
  fallback?: ReactNode;
};
const Show: FC<Props> = ({ children, when, fallback = null }) =>
  when ? children : fallback;

export default Show;
