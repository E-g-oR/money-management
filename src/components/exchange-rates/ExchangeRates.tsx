import { FC } from "react";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectLabel } from "../ui/select";
import {
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

const ExchangeRates: FC = () => {
  return (
    <div className="bg-primary-foreground rounded-md px-5 py-3 flex-auto">
      <p className="text-2xl">Rates</p>
      <Card>
        <Select >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"select currency"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </Card>
      
    </div>
  );
};

export default ExchangeRates;
