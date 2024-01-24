import { FC } from "react";

import PageLayout from "@/components/layout/page-layout";
import { ColorSchemeSelect, LanguageSelect } from "@/features/settings";

const Settings: FC = () => {
  return (
    <PageLayout title={"Settings"}>
      <LanguageSelect />
      <ColorSchemeSelect />
    </PageLayout>
  );
};

export default Settings;
