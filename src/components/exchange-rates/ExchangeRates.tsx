import { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RatesResponse } from "@/types/rates-response";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslation } from "@/lib/hooks/useTranslation";

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
    <div className="bg-primary-foreground rounded-md px-5 py-3 self-start flex flex-col gap-2 w-60">
      <p className="text-2xl">{t.common.rates}</p>
      {/* <div className={"flex flex-col gap-2"}> */}
        <p>Select base currency</p>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger>
            <SelectValue placeholder={"select currency"} />
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
      {/* </div> */}

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
    </div>
  );
};

export default ExchangeRates;
