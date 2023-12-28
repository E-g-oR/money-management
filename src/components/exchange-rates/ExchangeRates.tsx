import { FC, useState } from "react";

import { RatesResponse } from "@/types/rates-response";
import { useTranslation } from "@/lib/hooks/useTranslation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const currencies = ["EUR", "USD", "BYN", "RUB"] as const;
const ratesResponse: RatesResponse = {
  base: "USD",
  date: "2018-02-13",
  rates: {
    CAD: 1.260046,
    CHF: 0.933058,
    EUR: 0.806942,
    GBP: 0.719154,
  },
};

const ExchangeRates: FC = () => {
  const t = useTranslation();
  const [currency, setCurrency] = useState<string>(currencies[0]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.common.rates}</CardTitle>
        <CardDescription>{t.common.selectCurrency}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger>
            <SelectValue placeholder={t.common.selectCurrency} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currencies.map((curr) => (
                <SelectItem value={curr} key={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.common.currency}</TableHead>
              <TableHead>{t.common.rate}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(ratesResponse.rates).map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{ratesResponse.rates[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExchangeRates;
