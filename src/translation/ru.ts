import { Translation } from ".";

export const ru: Translation = {
  format: {
    currency: (value: number, currency = "USD") =>
      new Intl.NumberFormat("ru-RU", { currency }).format(value),
    date: (timestamp: number | string | Date) => "string",
  },
  common: {
    rates: "Курсы",
    currency: "Валюта",
    rate: "Курс",
    actions: {
      pay: "Заплатить",
      edit: "Изменить",
      save: "Сохранить",
      submit: "Подтвердить",
      delete: "Удалить",
    },
  },
  navbar: {
    accounts: "Счета",
    dashboard: "Дашборд",
    depts: "Долги",
    categories: "Категории",
    settings: "Настройки",
  },
  depts: {
    title: "Ваши долги",
    badges: {
      totalCount: "Количество долгов",
      totalAmount: "Общее значение долгов",
      closedCount: "Закрытые долги",
    },
  },
  accounts: {},
  categories: {},
  settings: {},
};
