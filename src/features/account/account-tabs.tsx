import { FC, useMemo } from "react";

import { NavLink, useParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Pages, ROUTES } from "@/router";
import { Card } from "@/components/ui/card";
import { Translation } from "@/translation/index";
import { useTranslation } from "@/hooks/useTranslation";

type TTab = {
  url: string;
  key: keyof Translation["accountPage"]["tabs"];
};

export const AccountTabs: FC = () => {
  const { accountId } = useParams<"accountId">();
  const t = useTranslation();
  const tabs: ReadonlyArray<TTab> = useMemo(
    () => [
      {
        url: ROUTES.accounts.account.builder(accountId ?? ""),
        key: "transactions",
      },
      { url: Pages.Chart, key: "chart" },
    ],
    [accountId]
  );
  return (
    <Card className="flex gap-2 p-2 max-w-xs">
      {tabs.map((tab) => (
        <NavLink key={tab.key} to={tab.url} className={"flex-1"}>
          {({ isActive }) => (
            <div
              className={cn(
                "p-2 flex-1 text-center rounded-sm transition-colors hover:bg-background",
                isActive && "bg-background"
              )}
            >
              {t.accountPage.tabs[tab.key]}
            </div>
          )}
        </NavLink>
      ))}
    </Card>
  );
};

export default AccountTabs;
