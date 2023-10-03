export interface Translation {
  format: {
    currency: (value: number, currency?: string) => string;
    date: (timestamp: number | string | Date) => string;
  };
  common: {
    rates: string;
    currency: string;
    rate: string;
    actions: {
      pay: string;
      edit: string;
      save: string;
      submit: string;
      delete: string;
    };
  };
  navbar: {
    accounts: string;
    dashboard: string;
    depts: string;
    categories: string;
    settings: string;
  };
  depts: {
    title: string;
    badges: {
      totalCount: string;
      totalAmount: string;
      closedCount: string;
    };
  };
  accounts: {};
  categories: {};
  settings: {};
}
