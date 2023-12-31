import { en } from "./en";
import { ru } from "./ru";

export type NavigationItemKey =
  | "accounts"
  | "dashboard"
  | "depts"
  | "categories"
  | "settings";

export interface Translation {
  format: {
    currency: (value: number, currency?: string) => string;
    date: (timestamp: string) => string;
    dateHeader: (date: Date) => string;
    weekAndMonthDay: (date: Date) => string;
    time: (date: Date) => string;
  };
  common: {
    rates: string;
    selectCurrency: string;
    rate: string;
    currency: string;
    transactionType: string;
    greeting: string;
    account: string;
    actions: {
      pay: string;
      edit: string;
      save: string;
      submit: string;
      delete: string;
      close: string;
      pickDate: string;
    };
    fieldMessages: {
      required: string;
      minLength: (lenght: number) => string;
      minValue: (value: number) => string;
    };
    name: string;
    description: string;
    value: string;
    coveredValue: string;
  };
  navbar: Record<NavigationItemKey, string>;
  depts: {
    title: string;
    noDeptsFallback: string;
    badges: {
      totalCount: string;
      totalAmount: string;
      closedCount: string;
    };
    createModal: {
      title: string;
      description: string;
      fields: {
        namePlaceholder: string;
        descriptionPlaceholder: string;
      };
    };
  };
  accounts: {
    title: string;
    noAccountsFallback: string;
    searchPlaceholder: string;
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
      };
    };
  };
  accountPage: {
    title: string;
    createTransactionModal: {
      title: string;
      description: string;
      fields: {
        title: {
          placeholder: string;
        };
        description: {
          placeholder: string;
        };
      };
    };
    recentTransactions: string;
    noTransactionsFallback: string;
  };
  categories: {};
  settings: {};
  inProgressPage: {
    title: string;
    description: string;
    secondDescription: string;
  }
}

export const dictionaries = {
  ru,
  en,
};
