import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

const value = 1275,
  coveredValue = 547;

const DeptsPage: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold">Your depts</h1>
      <div className="flex gap-2">
        <div className="flex flex-col items-center font-bold bg-primary-foreground rounded py-2 px-5">
          <span>Depts amount</span>
          <span>5</span>
        </div>
        <div className="flex flex-col items-center font-bold bg-primary-foreground rounded py-2 px-5">
          <span>Total depts sum</span>
          <span>$ 137</span>
        </div>
        <div className="flex flex-col items-center font-bold bg-primary-foreground rounded py-2 px-5">
          <span>Closed depts</span>
          <span>7</span>
        </div>
      </div>
      <Card className="flex gap-5 py-2 px-5">
        <div className="flex flex-col items-center flex-0 justify-between">
          <span className="text-2xl">$ {value}</span>
          <Button>Pay</Button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-5">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Apple</h2>
              <span>Credit for IPhone</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Pencil1Icon className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="">$ {coveredValue}</span>
            <Progress color="primary" value={(coveredValue / value) * 100} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeptsPage;
