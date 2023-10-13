import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Props<T> {
  data: ReadonlyArray<T> | null;
  render: (item: T, index: number) => ReactNode;
  skeletonComponent: ReactNode;
  fallback?: string;
}
function CardsList<T>({ data, render, skeletonComponent, fallback }: Props<T>) {
  return data ? (
    data.length > 0 ? (
      <ScrollArea>
      <div className={"grid grid-cols lg:grid-cols-2 xl:grid-cols-3 gap-3"}>
        {data.map(render)}
      </div>
      </ScrollArea>
    ) : (
      <i>{fallback}</i>
    )
  ) : (
    <div className={"grid grid-cols lg:grid-cols-2 xl:grid-cols-3 gap-3"}>
      {skeletonComponent}
      {skeletonComponent}
      {skeletonComponent}
    </div>
  );
}

export default CardsList;
