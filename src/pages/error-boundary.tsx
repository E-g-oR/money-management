import { FC } from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary: FC = () => {
  const error: any = useRouteError();
  return (
    <div className={"flex flex-col items-center justify-center h-screen gap-3"}>
      <h1 className={"text-4xl font-bold"}>Application has just crushed.</h1>
      <p>Something went wrong.</p>
      <i>{error?.message ?? "Unknown error."}</i>
    </div>
  );
};

export default ErrorBoundary;
