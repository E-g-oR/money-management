import React, { lazy } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import { NewLayout } from "@/components/layout/index.tsx";
import ThemeProvider from "@/components/layout/theme-provider.tsx";

import { ROUTES } from "./router/index.ts";
import ErrorBoundary from "./pages/error-boundary.tsx";
import ConfirmModal from "./components/confirm-modal.tsx";
import ResponsiveObserver from "./components/layout/responsive-observer.tsx";

import "./index.css";
// import { Api } from "./api/index.ts";

const DeptsPage = lazy(() => import("@/pages/depts/index.tsx")),
  AuthLayout = lazy(() => import("./pages/auth/Layout.tsx")),
  InProgress = lazy(() => import("./pages/in-progress.tsx")),
  LoginForm = lazy(() => import("./pages/auth/LoginForm.tsx")),
  AccountPage = lazy(() => import("@/pages/account/index.tsx")),
  AccountsPage = lazy(() => import("@/pages/accounts/index.tsx")),
  RegisterForm = lazy(() => import("./pages/auth/RegisterForm.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AccountsPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: ROUTES.accounts.index.relative,
        children: [
          {
            index: true,
            element: <AccountsPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: ROUTES.accounts.account.relative,
            element: <AccountPage />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: ROUTES.depts.path,
        element: <DeptsPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: ROUTES.categories.path,
        element: <InProgress />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: ROUTES.dashboard.path,
        element: <InProgress />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: ROUTES.settings.path,
        element: <InProgress />,
        errorElement: <ErrorBoundary />,
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
      <ResponsiveObserver>
        <ConfirmModal>
          <RouterProvider router={router} />
        </ConfirmModal>
      </ResponsiveObserver>
    </ThemeProvider>
  </React.StrictMode>
);
