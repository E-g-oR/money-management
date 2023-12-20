interface Route {
  path: string;
  relative: string;
}
interface RouteDynamic extends Route {
  builder: (...args: (string | number)[]) => string;
}

const buildPath = (pathnames: (string | number)[], isGlobal = true) =>
  isGlobal ? "/" + pathnames.join("/") : pathnames.join("/");

export enum Pages {
  Auth = "auth",
  Depts = "depts",
  Login = "login",
  Profile = "profile",
  Accounts = "accounts",
  Settings = "settings",
  Register = "register",
  Dashboard = "dashboard",
  Categories = "categories",
}
export enum PathParams {
  AccountId = ":accountId",
}

interface Routes {
  home: Route;
  accounts: {
    index: Route;
    account: RouteDynamic;
  };
  depts: Route;
  profile: Route;
  settings: Route;
  dashboard: Route;
  categories: Route;
  auth: {
    index: string,
    login: Route,
    register: Route,
  }
}
export const ROUTES: Routes = {
  home: {
    path: buildPath([Pages.Accounts]),
    relative: Pages.Accounts,
  },
  accounts: {
    index: {
      path: buildPath([Pages.Accounts]),
      relative: Pages.Accounts,
    },
    account: {
      path: buildPath([Pages.Accounts, PathParams.AccountId]),
      relative: PathParams.AccountId,
      builder: (accountId: number | string) => buildPath([Pages.Accounts, accountId]),
    },
  },
  categories: {
    path: buildPath([Pages.Categories]),
    relative: Pages.Categories,
  },
  depts: {
    path: buildPath([Pages.Depts]),
    relative: Pages.Depts,
  },
  settings: {
    path: buildPath([Pages.Settings]),
    relative: Pages.Settings,
  },
  profile: {
    path: buildPath([Pages.Profile]),
    relative: Pages.Profile,
  },
  dashboard: {
    path: buildPath([Pages.Dashboard]),
    relative: Pages.Dashboard,
  },
  auth: {
    index: Pages.Auth,
    login: {
      path: buildPath([Pages.Auth, Pages.Login]),
      relative: Pages.Login
    },
    register: {
      path: buildPath([Pages.Auth, Pages.Register]),
      relative: Pages.Register
    }
  }
};
