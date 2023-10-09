import { Card } from "@/components/ui/card";
import { MoveDownLeft, MoveUpRight } from "lucide-react";
import { FC } from "react";

const AccountCard: FC = () => {
  return (
    <Card
      className={
        "py-3 px-7 flex gap-5 justify-between bg-gradient-to-r from-slate-500/20 to-slate-800/10"
      }
    >
      <div className="flex flex-col justify-evenly">
        <span className={"text-2xl"}>870 $</span>
        {/* TODO: show account difference on last month */}
        <h2 className={"text-2xl font-bold"}>Alfa bank</h2>
        <p>Main card with salary</p>
      </div>
      <div>
        <div className="flex gap-3 items-center">
          <div className="bg-green-400/30 rounded p-2">
            <MoveUpRight className="stroke-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-green-500">540 $</span>
            <span>Incomes</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="bg-red-400/30 rounded p-2">
            <MoveDownLeft className="stroke-red-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-red-500">540 $</span>
            <span>Expenses</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccountCard;
