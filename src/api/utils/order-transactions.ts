import * as D from "fp-ts/Date";
import * as A from "fp-ts/ReadonlyArray";
import { pipe } from "fp-ts/lib/function";
import { contramap, reverse } from "fp-ts/Ord";

import { TCreatedAt } from "../crud";

const byCreatedAt = pipe(
  D.Ord,
  contramap((a: TCreatedAt) => a.created_at),
  reverse
);

export const orderByCreatedAt = <T extends TCreatedAt>(
  data: ReadonlyArray<T>
) => pipe(data, A.sortBy([byCreatedAt]));
