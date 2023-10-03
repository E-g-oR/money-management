import { Translation } from "@/translation";
import { en } from "@/translation/en";
import { ru } from "@/translation/ru";

export const useTranslation = (): Translation => {
  return ru;
};
