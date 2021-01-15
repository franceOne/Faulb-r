import { StockPerformance } from "./PerformanceStocks"
import {Performance} from './PerformanceStocks'

export class PerformanceStockList {

  stockPerformances: StockPerformance[]

  constructor(stockPerformances: StockPerformance[]){
    this.stockPerformances=stockPerformances
  }

  getSortedPerformanceListByYear(startDate: Date, endDate: Date): {valid: Performance[], invalid: Performance[] }{
    const newStockPerformances = [...this.stockPerformances]
    const performanceList: ({name: string} & Performance) [] = []

    for(const stock of newStockPerformances){
      const performance =  stock.getPerformanceByYear(startDate, endDate)
      performanceList.push({...performance, name: stock.name})
    }
    const validPerformance = performanceList.filter(x => !isNaN(x.performance)).sort((a,b) => a.performance - b.performance)
    const invalidPerformance = performanceList.filter(x => isNaN(x.performance))

    return {valid: validPerformance, invalid: invalidPerformance} 
  }

}