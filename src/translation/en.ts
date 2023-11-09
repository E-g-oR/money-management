import format from "date-fns/format";
import { Translation } from ".";
import {enUS as locale} from "date-fns/locale"

export const en: Translation = {
  format: {
    currency: (value: number, currency = "USD") =>
      new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
        value
      ),
    date: (timestamp: string) =>
      format(Date.parse(timestamp), "LLL do, p", { locale }),
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
        value: {
          placeholder: "0",
        },
      },
    },
  },
  categories: {},
  settings: {},
};
