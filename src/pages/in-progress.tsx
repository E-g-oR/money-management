import { useTranslation } from "@/hooks/useTranslation";
import { FC } from "react";

const InProgress: FC = () => {
  const t = useTranslation();
  return (
    <div className={"flex flex-col gap-3 justify-center items-center text-center"}>
      <h1 className={"text-4xl font-bold text-center"}>
        {t.inProgressPage.title}
      </h1>
      <p>{t.inProgressPage.description}</p>
      <i>{t.inProgressPage.secondDescription}</i>
    </div>
  );
};

export default InProgress;
