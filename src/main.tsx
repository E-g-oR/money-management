import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/index.tsx";
import { ROUTES } from "./router/index.ts";
import AccountsPage from "./pages/accounts/index.tsx";
import DeptsPage from "./pages/depts/index.tsx";
import ThemeProvider from "./components/layout/theme-provider.tsx";
import { ThinBackend } from "thin-backend-react/index";
import { initThinBackend } from "thin-backend";
import "thin-backend-react/auth.css"
// This needs to be run before any calls to `query`, `createRecord`, etc.
initThinBackend({
  // This url is different for each backend, this one points to 'money-management'
  host: import.meta.env.VITE_BACKEND_URL,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AccountsPage />,
      },
      {
        path: ROUTES.accounts.index.relative,
        element: <AccountsPage />,
      },
      {
        path: ROUTES.depts.path,
        element: <DeptsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThinBackend requireLogin>
        <RouterProvider router={router} />
      </ThinBackend>
    </ThemeProvider>
  </React.StrictMode>
);
