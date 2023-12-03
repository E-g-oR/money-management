import { getLanguage, useSettingsStore } from "@/store/settings";
import { Translation, dictionaries } from "@/translation";

export const useTranslation = (): Translation => {
  const lang = useSettingsStore(getLanguage)
  return dictionaries[lang];
};
