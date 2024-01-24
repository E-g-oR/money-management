import { FC } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import PageLayout from "@/components/layout/page-layout";
import { ColorSchemeSelect, LanguageSelect } from "@/features/settings";

const Settings: FC = () => {
  const t = useTranslation();
  return (
    <PageLayout title={t.settings.title}>
      <LanguageSelect />
      <ColorSchemeSelect />
    </PageLayout>
  );
};

export default Settings;
