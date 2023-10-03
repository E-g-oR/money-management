import { Translation } from ".";

export const en: Translation = {
  format: {
    currency: (value: number, currency = "USD") => new Intl.NumberFormat("en-US", {currency}).format(value),
    date: (timestamp: number | string | Date) => "string",
  },
  common: {
    rates: "Rates",
    currency: "Currency",
    rate: "Rate",
    actions: {
      pay: "Pay",
      edit: "Edit",
      save: "Save",
      submit: "Submit",
      delete: "Delete",
    },
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
    badges: {
      totalCount: "Depts count",
      totalAmount: "Total depts amount",
      closedCount: "Closed depts",
    },
  },
  accounts: {},
  categories: {},
  settings: {},
}