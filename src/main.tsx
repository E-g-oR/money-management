import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ThinBackend } from "thin-backend-react/index";
import { initThinBackend } from "thin-backend";

import DeptsPage from "@/pages/depts/index.tsx";
import AccountPage from "@/pages/account/index.tsx";
import AccountsPage from "@/pages/accounts/index.tsx";
import Layout from "@/components/layout/index.tsx";
import ThemeProvider from "@/components/layout/theme-provider.tsx";
import { ROUTES } from "./router/index.ts";

import "thin-backend-react/auth.css";
import "./index.css";
import ErrorBoundary from "./pages/error-boundary.tsx";
import ResponsiveObserver from "./components/layout/responsive-observer.tsx";
import InProgress from "./pages/in-progress.tsx";

initThinBackend({
  host: import.meta.env.VITE_BACKEND_URL,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AccountsPage />,
      },
      {
        path: ROUTES.accounts.index.relative,
        children: [
          {
            index: true,
            element: <AccountsPage />,
          },
          {
            path: ROUTES.accounts.account.relative,
            element: <AccountPage />,
          },
        ],
      },
      {
        path: ROUTES.depts.path,
        element: <DeptsPage />,
      },
      {
        path: ROUTES.categories.path,
        element: <InProgress/>
      },
      {
        path: ROUTES.settings.path,
        element: <InProgress/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThinBackend requireLogin>
        <ResponsiveObserver>
          <RouterProvider router={router} />
        </ResponsiveObserver>
      </ThinBackend>
    </ThemeProvider>
  </React.StrictMode>
);
