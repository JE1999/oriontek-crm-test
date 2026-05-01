import { useTranslation } from "react-i18next";

export const useT = (ns?: string) => {
  return useTranslation(ns);
};
