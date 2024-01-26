import { langages } from "@/data/constants";
import { pipe } from "fp-ts/lib/function";
import * as RR from "fp-ts/ReadonlyRecord"
import * as A from "fp-ts/ReadonlyArray"

export const processLanguages = (langs: typeof langages) => pipe(
    langs,
    RR.toEntries,
    A.map(([langKey]) => langKey)
)