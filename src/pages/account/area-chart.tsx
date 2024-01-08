import { FC } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { TTransaction } from "@/types/transactions/transaction";

import { processChartData } from "./utils/process-chart-data";

type Props = {
  transactions: ReadonlyArray<TTransaction> | null;
  // currency:
};
const AreaChart_: FC<Props> = ({ transactions = [] }) => {
  const t = useTranslation();
  const processedData = transactions?.length && processChartData(transactions);

  return (
    <Card className="py-5 pr-4 h-full flex-1">
      <ResponsiveContainer height={"100%"} className={"h-full"}>
        <AreaChart
          width={500}
          height={400}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data={processedData}
          margin={{
            top: 0,
            right: 0,
            left: 20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorExpence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7f1d1d" stopOpacity={0.5} />
              <stop offset="50%" stopColor="#7f1d1d" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#7f1d1d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
              <stop offset="50%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 11" vertical={false} />
          <XAxis
            dataKey={"date"}
            axisLine={false}
            className={"text-sm"}
            tickFormatter={t.format.date}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => t.format.currency(value)}
            className={"text-sm"}
          />
          <Tooltip />
          <Area
            connectNulls
            type="monotone"
            dataKey="expence"
            stackId="1"
            stroke="#7f1d1d"
            fill="url(#colorExpence)"
          />
          <Area
            connectNulls
            type="monotone"
            dataKey="income"
            stackId="1"
            stroke="#22c55e"
            fill="url(#colorIncome)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AreaChart_;
