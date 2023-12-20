export const calcProgress = (value: number, coveredValue: number): number =>
  (coveredValue / value) * 100;
