import { ReactNode } from "react";

import Show from "../show";
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
      <Show
        when={!isLoading}
        fallback={
          <div
            className={"grid grid-cols xl:grid-cols-2 2xl:grid-cols-3 gap-3"}
          >
            {skeletonComponent}
            {skeletonComponent}
            {skeletonComponent}
          </div>
        }
      >
        <Show when={!!data && data.length > 0} fallback={<i>{fallback}</i>}>
          <ScrollArea>
            <div
              className={"grid grid-cols xl:grid-cols-2 2xl:grid-cols-3 gap-3"}
            >
              {data?.map(render)}
            </div>
          </ScrollArea>
        </Show>
      </Show>
    </>
  );
}

export default CardsList;
