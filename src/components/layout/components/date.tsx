import { useTranslation } from "@/lib/hooks/useTranslation";
import { FC, useEffect, useState } from "react";

const HeaderDate: FC = () => {
  const t = useTranslation();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      if (date.getMinutes() !== newDate.getMinutes()) {
        setDate(newDate);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [date]);

  return (
    <span className="ml-auto">
      {t.format.weekAndMonthDay(date)}
      {", "}
      <span className="text-xl">{t.format.time(date)}</span>
    </span>
  );
};

export default HeaderDate;
