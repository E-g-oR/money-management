import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import DeptsPage from "@/pages/depts/index.tsx";
import Layout from "@/components/layout/index.tsx";
import AccountPage from "@/pages/account/index.tsx";
import AccountsPage from "@/pages/accounts/index.tsx";
import ThemeProvider from "@/components/layout/theme-provider.tsx";

import { ROUTES } from "./router/index.ts";
import InProgress from "./pages/in-progress.tsx";
import AuthLayout from "./pages/auth/Layout.tsx";
import LoginForm from "./pages/auth/LoginForm.tsx";
import ErrorBoundary from "./pages/error-boundary.tsx";
import RegisterForm from "./pages/auth/RegisterForm.tsx";
import ConfirmModal from "./components/confirm-modal.tsx";
import ResponsiveObserver from "./components/layout/responsive-observer.tsx";

import "thin-backend-react/auth.css";

import "./index.css";


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
        element: <InProgress />,
      },
      {
        path: ROUTES.dashboard.path,
        element: <InProgress />,
      },
      {
        path: ROUTES.settings.path,
        element: <InProgress />,
      },
    ],
  },
  {
    path: ROUTES.auth.index,
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.auth.login.relative,
        element: <LoginForm />,
      },
      {
        path: ROUTES.auth.register.relative,
        element: <RegisterForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <ThinBackend requireLogin> */}
      <ResponsiveObserver>
        <ConfirmModal>
          <RouterProvider router={router} />
        </ConfirmModal>
      </ResponsiveObserver>
      {/* </ThinBackend> */}
    </ThemeProvider>
  </React.StrictMode>
);
