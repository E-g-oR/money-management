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

type TTooltipPayload = {
  stroke: string;
  fill: string;
  fillOpacity: number;
  dataKey: string;
  name: string;
  color: string;
  value: number;
  payload: {
    date: string;
    income: number;
  };
};

type TTooltipProps = {
  active: boolean;
  payload: ReadonlyArray<TTooltipPayload>;
  label: string;
  currency: string;
};
// TODO: move to separated file
const CustomTooltip: FC<TTooltipProps> = ({
  active,
  payload,
  label,
  currency,
}) => {
  const t = useTranslation();

  if (active && payload && payload.length) {
    return (
      <Card className={"py-2 px-4 bg-background"}>
        <p>{t.format.dateShort(label)}</p>
        {payload.map((p) => (
          <p
            key={p.dataKey}
            className={"capitalize"}
            style={{ color: p.stroke }}
          >
            {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*  @ts-ignore */}
            {t.common?.[p.dataKey] ?? p.dataKey}:{" "}
            {t.format.currency(p.value, currency)}
          </p>
        ))}
      </Card>
    );
  }

  return null;
};

type Props = {
  transactions: ReadonlyArray<TTransaction> | null;
  currency: string;
};
const AreaChart_: FC<Props> = ({ transactions = [], currency = "BYN" }) => {
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
            top: 5,
            right: 5,
            left: 20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id={"colorExpence"}
              x1={"0"}
              y1={"0"}
              x2={"0"}
              y2={"1"}
            >
              <stop offset={"5%"} stopColor={"#7f1d1d"} stopOpacity={0.5} />
              <stop offset={"50%"} stopColor={"#7f1d1d"} stopOpacity={0.2} />
              <stop offset={"95%"} stopColor={"#7f1d1d"} stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id={"colorIncome"}
              x1={"0"}
              y1={"0"}
              x2={"0"}
              y2={"1"}
            >
              <stop offset={"5%"} stopColor={"#22c55e"} stopOpacity={0.5} />
              <stop offset={"50%"} stopColor={"#22c55e"} stopOpacity={0.2} />
              <stop offset={"95%"} stopColor={"#22c55e"} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray={"5 11"} vertical={false} />
          <XAxis
            dataKey={"date"}
            axisLine={false}
            className={"text-sm"}
            tickFormatter={t.format.dateShort}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => t.format.currency(value, currency)}
            className={"text-sm"}
          />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip currency={currency} />} />
          <Area
            connectNulls
            type={"monotone"}
            dataKey={"expence"}
            stackId={"1"}
            stroke={"#7f1d1d"}
            fill={"url(#colorExpence)"}
          />
          <Area
            connectNulls
            type={"monotone"}
            dataKey={"income"}
            stackId={"1"}
            stroke={"#22c55e"}
            fill={"url(#colorIncome)"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AreaChart_;
