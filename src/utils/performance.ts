export const calculatePerformance = (base: number, actualPrice: number): number => {
  if(isNaN(base) || isNaN(actualPrice)) {
    return NaN
  }
  return (actualPrice/base - 1)*100
}