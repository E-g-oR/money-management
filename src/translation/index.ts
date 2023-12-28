import { en } from "./en";
import { ru } from "./ru";

export type NavigationItemKey = "accounts" | "dashboard" | "depts" | "categories" | "settings"

export interface Translation {
  format: {
    currency: (value: number, currency?: string) => string;
    date: (timestamp: string) => string;
    dateHeader: (date: Date) => string;
    weekAndMonthDay: (date: Date) => string,
    time: (date: Date) => string 
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
    value: string,
    coveredValue: string,
  };
  navbar: Record<NavigationItemKey, string>;
  depts: {
    title: string;
    badges: {
      totalCount: string;
      totalAmount: string;
      closedCount: string;
    };
    createModal: {
      title: string,
      description: string,
      fields: {
        namePlaceholder: string,
        descriptionPlaceholder: string,
      }
    }
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
