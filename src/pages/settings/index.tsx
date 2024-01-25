import { FC } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import PageLayout from "@/components/layout/page-layout";
import { ColorSchemeSelect, LanguageSelect } from "@/features/settings";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRequestTrigger } from "@/hooks/useRequest";
import { Api } from "@/api";

const Settings: FC = () => {
  const t = useTranslation();
  const { run: signOut, isLoading } = useRequestTrigger(Api.signOut);
  return (
    <PageLayout title={t.settings.title}>
      <LanguageSelect />
      <ColorSchemeSelect />
      <Button className={"sm:w-fit"} isLoading={isLoading} onClick={signOut}>
        Log out <LogOut className={"ml-2"} />
      </Button>
    </PageLayout>
  );
};

export default Settings;
