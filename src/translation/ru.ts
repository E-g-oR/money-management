import { format } from "date-fns/format";
import { Translation } from ".";
import { ru as locale } from "date-fns/locale";

export const ru: Translation = {
  format: {
    currency: (value: number, currency = "USD") =>
      new Intl.NumberFormat("ru-RU", { style: "currency", currency }).format(
        value
      ),
    date: (timestamp: string) =>
      format(Date.parse(timestamp), "LLL do, p", { locale }),
    dateHeader: (date) => format(date, "eeee, do MMMM, p", { locale }),
    weekAndMonthDay: (date) => format(date, "eeee, do MMMM", { locale }),
    time: (date) => format(date, "p", { locale }),
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
    fieldMessages: {
      required: "Это поле обязательно для заполнения.",
      minLength: (lenght: number) =>
        `Это поле должно быть как минимум ${lenght} символов.`,
      minValue: (value: number) =>
        `Это поле не может быть меньше, чем ${value}.`,
    },
    name: "Название",
    description: "Описание",
    value: "Значение",
    coveredValue: "Покрытое значение",
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
    createModal: {
      title: "Создать запись долга",
      description: `Создайте запись долга здесь. Нажмите "подтвердить", когда закончите.`,
      fields: {
        namePlaceholder: "Айфон",
        descriptionPlaceholder: "Кредит за Айфон в А1",
      },
    },
  },
  accounts: {
    createAccountModal: {
      title: "Создать счет",
      description:
        'Создайте ваш счет здесь. Нажмите "подтвердить", когда закончите.',
      fields: {
        name: {
          placeholder: "Зарплата",
        },
        description: {
          placeholder: "Главный счет, куда приходит зарплата.",
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
