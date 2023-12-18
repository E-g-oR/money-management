import { Card } from "@/components/ui/card";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;
