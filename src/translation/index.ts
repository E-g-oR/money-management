import { en } from "./en";
import { ru } from "./ru";

export type NavigationItemKey =
  | "accounts"
  | "dashboard"
  | "depts"
  | "categories"
  | "settings";

export type ColorSchemeKey = "light" | "dark" | "auto";

export interface Translation {
  format: {
    currency: (value: number, currency?: string) => string;
    date: (timestamp: string) => string;
    dateShort: (timestamp: string) => string;
    dateHeader: (date: Date) => string;
    weekAndMonthDay: (date: Date) => string;
    time: (date: Date) => string;
  };
  common: {
    loading: string;
    rates: string;
    selectCurrency: string;
    rate: string;
    currency: string;
    transactionType: string;
    greeting: string;
    account: string;
    moreActions: string;
    actions: {
      pay: string;
      edit: string;
      save: string;
      submit: string;
      delete: string;
      close: string;
      pickDate: string;
      cancel: string;
      logOut: string;
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
    income: string;
    expence: string;
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
      tooltip: string;
    };
    payModal: {
      needsTo: string;
      toCloseDept: string;
    }
  };
  accounts: {
    title: string;
    noAccountsFallback: string;
    searchPlaceholder: string;
    createAccountModal: {
      tooltip: string;
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
      tooltip: string;
    };
    recentTransactions: string;
    noTransactionsFallback: string;
    tabs: {
      transactions: string;
      chart: string;
    };
    transeferToAnotherAccountModal: {
      title: string;
      description: string;
      tooltip: string;
    };
    deleteAccountModal: {
      title: string;
      description: string;
    }
  };
  categories: {};
  settings: {
    title: string;
    darkMode: string;
    appLanguage: string;
    colorSchemes: Record<ColorSchemeKey, string>
  };
  inProgressPage: {
    title: string;
    description: string;
    secondDescription: string;
  };
  auth: {
    logOutConfirmModal: {
      title: string
      description: string;
    }
  }
}

export const dictionaries = {
  ru,
  en,
};
