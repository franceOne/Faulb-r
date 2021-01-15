import { Stock } from "../../Stock/Stock"
import { StockList } from "../../Stock/StockList"
import { calculatePerformance } from "../../utils/performance"
import { PerformanceStockList } from "./PerformanceStockList"

export type Performance = {
  name? : string
  startDate: Date, 
  endDate: Date,
  performance: number,
  startValue: number,
  endValue: number 
}

export class StockPerformance {
  name: string
  performanceList: Performance[] 
  
  constructor(name: string, performanceList: Performance[]){
    this.name=name;
    this.performanceList=performanceList;
  }

  getPerformanceByYear(start:Date, end:Date){
    const filteredList = this.performanceList.filter(performance => performance.startDate.getTime() >= start.getTime() && performance.endDate.getTime() <= end.getTime())
    //console.log("start", start, "end", end)
    if(filteredList.length != 1){
      console.log("ERRROR, FilteredList not 1", filteredList.length)
    }
    return filteredList[0]
  }
}


const generateStockPerformance = (stock: Stock,  end: Date, startDate: Date,  getNextDatesToCompare: (date: Date) => [Date,Date, Date] ): StockPerformance => {
  const performanceList: Performance[] = []
  let actualDate = new Date(startDate.getTime())

  let [performanceStart, performanceEnd, iteratorDate] = getNextDatesToCompare(startDate)
  while (!(actualDate.getTime() > end.getTime())) {

    const startData = stock.getStockPriceByDataMonthly(performanceStart)
    const endData = stock.getStockPriceByDataMonthly(performanceEnd)
    const performance = calculatePerformance(startData.price, endData.price)

    performanceList.push({startDate: performanceStart, endDate: performanceEnd, performance, endValue: endData.price, startValue: startData.price})

    const newDates  = getNextDatesToCompare(iteratorDate)
    performanceStart = newDates[0]
    performanceEnd = newDates[1]
    iteratorDate = newDates[2]

    actualDate = new Date(performanceStart.getTime())

  }
  return new StockPerformance(stock.name, performanceList)
}

export const generatePerformanceStockList = (stocks: StockList, start: Date, end: Date, getNextDatesToCompare: (date: Date) => [Date,Date, Date] ) => {
  const performanceStocks: StockPerformance[] = []
  for(let stock of stocks.stocks){
    performanceStocks.push(generateStockPerformance(stock, new Date(end.getTime()), new Date(start.getTime()), getNextDatesToCompare ))
  } 
    return new PerformanceStockList(performanceStocks);
}