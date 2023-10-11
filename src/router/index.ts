interface Route {
  path: string;
  relative: string;
}
interface RouteDynamic extends Route {
  builder?: (...args: (string | number)[]) => string;
}

const buildPath = (...pathnames: (string | number)[]) =>
  "/" + pathnames.join("/");

const accounts = "accounts",
  depts = "depts",
  categories = "categories",
  settings = "settings",
  profile = "profile",
  accountIdParam = ":accountId";

interface Routes {
  home: Route;
  accounts: {
    index: Route;
    account: RouteDynamic;
  };
  depts: Route;
  categories: Route;
  settings: Route;
  profile: Route;
}
export const ROUTES: Routes = {
  home: {
    path: buildPath(accounts),
    relative: accounts,
  },
  accounts: {
    index: {
      path: buildPath(accounts),
      relative: accounts,
    },
    account: {
      path: buildPath(accounts, accountIdParam),
      relative: accountIdParam,
      builder: (accountId: number | string) => buildPath(accounts, accountId),
    },
  },
  categories: {
    path: buildPath(categories),
    relative: categories,
  },
  depts: {
    path: buildPath(depts),
    relative: depts,
  },
  settings: {
    path: buildPath(settings),
    relative: settings,
  },
  profile: {
    path: buildPath(profile),
    relative: profile,
  },
};
