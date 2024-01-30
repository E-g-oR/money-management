import { ReactNode } from "react";

import Show from "../show";
import LinearLoader from "../linear-loader";
import { ScrollArea } from "../ui/scroll-area";

interface Props<T> {
  data: ReadonlyArray<T> | null;
  render: (item: T, index: number) => ReactNode;
  skeletonComponent: ReactNode;
  fallback?: string;
  isLoading?: boolean;
}
function CardsList<T>({
  data,
  render,
  skeletonComponent,
  fallback,
  isLoading = false,
}: Props<T>) {
  return (
    <>
      <Show when={!!data && data.length > 0} fallback={<i>{fallback}</i>}>
        <ScrollArea className={"h-full flex-1"}>
          <Show when={isLoading}>
            <LinearLoader className={"absolute w-full top-0 left-0"} />
          </Show>
          <div
            className={"grid grid-cols xl:grid-cols-2 2xl:grid-cols-3 gap-3"}
          >
            {data?.map(render)}
          </div>
        </ScrollArea>
      </Show>
      <Show when={isLoading && !data}>
        <div className={"grid grid-cols xl:grid-cols-2 2xl:grid-cols-3 gap-3"}>
          {skeletonComponent}
          {skeletonComponent}
          {skeletonComponent}
        </div>
      </Show>
    </>
  );
}

export default CardsList;
