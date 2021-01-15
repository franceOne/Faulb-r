import { StockList } from "../../Stock/StockList"

const getStartAndEndDateOfCalculationTime = (date: Date) => {
  const startDate = new Date(date.getTime())
  startDate.setMonth(0)

  const endDate = new Date(date.getTime())
  endDate.setMonth(11)

  return [startDate, endDate]
}

const getLastYearDates = (date: Date) => {
  const oneYearAgo = new Date(date.getTime())
  oneYearAgo.setFullYear(oneYearAgo.getFullYear()-1)
  const getLastYearDates = getStartAndEndDateOfCalculationTime(oneYearAgo)
  return getLastYearDates
}

const getNextYearDates = (date: Date) => {
  const oneYearAgo = new Date(date.getTime())
  oneYearAgo.setFullYear(oneYearAgo.getFullYear()+1)
  const getLastYearDates = getStartAndEndDateOfCalculationTime(oneYearAgo)
  return getLastYearDates
}


const run = (stocks: StockList, start: Date, end: Date =  new Date()) => {
  const isFinished = false
  const startDate = new Date(start.getTime())
  startDate.setFullYear(startDate.getFullYear()+1)

  const endDate = new Date(end.getTime())
  endDate.setFullYear(endDate.getFullYear()+1)

  while (!(startDate.getTime() > endDate.getTime()) || !isFinished){
    const stockList:{name: string, startDate: Date, endDate: Date, performance: number,   }[] =[]
    const lastYearDates = getLastYearDates(startDate)
    const nextYearDates = getNextYearDates(startDate)
    const getActualStocks = stocks.getStockByName


  }
}

