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
    selectCurrency: "Выберите валюту",
    transactionType: "Тип транзакции",
    rate: "Курс",
    greeting: "С возвращением",
    account: "Счет",
    actions: {
      pay: "Заплатить",
      edit: "Изменить",
      save: "Сохранить",
      submit: "Подтвердить",
      delete: "Удалить",
      close: "Закрыть",
      pickDate: "Выбрать дату",
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
    noDeptsFallback: "У вас пока нет никаких долгов. Поздравляем!",
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
    noAccountsFallback: "У вас пока нет ни одного счета.",
    searchPlaceholder: "Поиск счета",
    title: "Ваши счета",
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
      },
    },
  },
  accountPage: {
    title: "string",
    createTransactionModal: {
      title: "Создайте транзакцию",
      description: "Создайте запись расходов или доходов по вашему счету",
      fields: {
        title: {
          placeholder: "Продукты",
        },
        description: {
          placeholder: "Творог, яйца, куриное филе",
        },
      },
    },
    recentTransactions: "Ваши недавние транзакции",
    noTransactionsFallback: "У вас пока нет тразакций для данного аккаунта.",
  },
  categories: {},
  settings: {},
  inProgressPage: {
    title: "В разработке...",
    description: "Приносим извинения, эта страница еще находится в стадии разработки.",
    secondDescription: "Пожалуйста, возвращайтесь на эту страницу позже.",
  },
};
