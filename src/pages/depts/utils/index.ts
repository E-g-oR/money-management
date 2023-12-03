export const calcProgress = (value: string, coveredValue: string): number =>
  (parseFloat(coveredValue) / parseFloat(value)) * 100;
