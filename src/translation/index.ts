import { en } from "./en";
import { ru } from "./ru";

export type NavigationItemKey = "accounts" | "dashboard" | "depts" | "categories" | "settings"

export interface Translation {
  format: {
    currency: (value: number, currency?: string) => string;
    date: (timestamp: string) => string;
  };
  common: {
    rates: string;
    rate: string;
    currency: string;
    actions: {
      pay: string;
      edit: string;
      save: string;
      submit: string;
      delete: string;
    };
    fieldMessages: {
      required: string;
      minLength: (lenght: number) => string;
      minValue: (value: number) => string;
    };
    name: string,
    description: string,
    value: string
  };
  navbar: Record<NavigationItemKey, string>;
  depts: {
    title: string;
    badges: {
      totalCount: string;
      totalAmount: string;
      closedCount: string;
    };
  };
  accounts: {
    createAccountModal: {
      title: string;
      description: string;
      fields: {
        name: {
          placeholder: string;
        };
        description: {
          placeholder: string;
        };
        value: {
          placeholder: string;
        };
      };
    };
  };
  categories: {};
  settings: {};
}

export const dictionaries = {
  ru,
  en,
};
