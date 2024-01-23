import { useTranslation } from "@/hooks/useTranslation";
import { getUser, useAuthStore } from "@/store/auth";
import { FC } from "react";

const Greeting: FC = () => {
  const t = useTranslation();
  const currentUser = useAuthStore(getUser)
  return <p className="text-2xl font-bold">{t.common.greeting}, {currentUser?.displayName ?? "noname"}!</p>;
};

export default Greeting;
