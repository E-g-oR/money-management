import { format } from "date-fns";

import { enUS as locale } from "date-fns/locale";

import { Translation } from ".";

export const en: Translation = {
  format: {
    currency: (value: number, currency = "USD") =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }).format(value),
    date: (timestamp: string) =>
      format(Date.parse(timestamp), "LLL do, p", { locale }),
    dateShort: (timestamp: string) =>
      format(Date.parse(timestamp), "MM.dd.yy", { locale }),
    dateHeader: (date) => format(date, "eeee, do MMMM, p", { locale }),
    weekAndMonthDay: (date) => format(date, "eeee, do MMMM", { locale }),
    time: (date) => format(date, "p", { locale }),
  },
  common: {
    loading: "Loading",
    rates: "Rates",
    currency: "Currency",
    selectCurrency: "Select Currency",
    transactionType: "Transaction Type",
    rate: "Rate",
    greeting: "Welcome back",
    account: "Account",
    actions: {
      pay: "Pay",
      edit: "Edit",
      save: "Save",
      submit: "Submit",
      delete: "Delete",
      close: "Close",
      pickDate: "Pick A Date",
    },
    fieldMessages: {
      required: "This field is required.",
      minLength: (lenght: number) =>
        `This field must be at least ${lenght} characters lenght.`,
      minValue: (value: number) => `This value can not be less than ${value}.`,
    },
    name: "Name",
    description: "Description",
    value: "Value",
    coveredValue: "Covered value",
    income: "Icnome",
    expence: "Expense",
  },
  navbar: {
    accounts: "Accounts",
    dashboard: "Dashboard",
    depts: "Depts",
    categories: "Categories",
    settings: "Settings",
  },
  depts: {
    title: "Your depts",
    noDeptsFallback: "You have no any depts yet. Congratulations!",
    badges: {
      totalCount: "Depts count",
      totalAmount: "Total depts amount",
      closedCount: "Closed depts",
    },
    createModal: {
      title: "Create dept",
      description: `Create dept here. Press "confirm", when finished.`,
      fields: {
        namePlaceholder: "iPhone",
        descriptionPlaceholder: "Credit for iPhone",
      },
    },
  },
  accounts: {
    title: "Your accounts",
    noAccountsFallback: "You dont have any accounts yet.",
    searchPlaceholder: "Search accounts",
    createAccountModal: {
      title: "Create account",
      description: "Create your new account here. Click save when you're done.",
      fields: {
        name: {
          placeholder: "Salary",
        },
        description: {
          placeholder: "Main account where i get salary.",
        },
      },
    },
  },
  accountPage: {
    title: "string",
    createTransactionModal: {
      title: "Create transaction",
      description: "Create a transaction of income or expense on your account",
      fields: {
        title: {
          placeholder: "Grocery",
        },
        description: {
          placeholder: "Cottage cheese, chic eggs, chicken breasts",
        },
      },
    },
    recentTransactions: "Your recent transactions",
    noTransactionsFallback:
      "You don't have any recent transactions for this account yet.",
    tabs: {
      transactions: "Transactions",
      chart: "Chart",
    },
    transeferToAnotherAccountModal: {
      title: "Transfer to another account",
      description: "Here you can note the transfer of money to another account",
    },
  },
  categories: {},
  settings: {
    title: "Settings",
    darkMode: "Dark mode",
    appLanguage: "App language",
    colorSchemes: {
      light: "Light",
      dark: "Dark",
      auto: "Auto",
    },
  },
  inProgressPage: {
    title: "In progress...",
    description: "Sorry, this page is currently in progress.",
    secondDescription: "Please come back to this page later.",
  },
};
