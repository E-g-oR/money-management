import { ReactNode } from "react";

interface Props<T> {
  data: ReadonlyArray<T> | null;
  render: (item: T, index: number) => ReactNode;
  skeletonComponent: ReactNode;
  fallback?: string;
}
function CardsList<T>({ data, render, skeletonComponent, fallback }: Props<T>) {
  return data ? (
    data.length > 0 ? (
      <div className={"grid grid-cols lg:grid-cols-2 xl:grid-cols-3 gap-3"}>
        {data.map(render)}
      </div>
    ) : (
      <i>{fallback}</i>
    )
  ) : (
    skeletonComponent
  );
}

export default CardsList;
