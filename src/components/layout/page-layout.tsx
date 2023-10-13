import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title?: string;
  action?: ReactNode;
}
const PageLayout: FC<Props> = ({ children, title, action }) => (
  <div className={"flex-grow flex-shrink-0 flex flex-col gap-5"}>
    <div className={"flex items-center justify-between"}>
      <h1 className="text-4xl font-bold">{title}</h1>
      {action}
    </div>
    {children}
  </div>
);

export default PageLayout;
