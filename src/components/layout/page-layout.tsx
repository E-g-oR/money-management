import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title?: string;
  action?: ReactNode;
}
const PageLayout: FC<Props> = ({ children, title, action }) => (
  <div className={"overflow-hidden flex flex-col gap-5 animate-in fade-in-0 zoom-in-95"}>
    <div className={"flex items-center justify-between"}>
      <h1 className={"text-3xl font-bold"}>{title}</h1>
      {action}
    </div>
    {children}
  </div>
);

export default PageLayout;
