import { addContent, addWorkSheet, generateExcelSheet, saveFile } from "../../FileWriter/XLSWriter";
import { StockList } from "../../Stock/StockList";
import { generatePerformanceStockList } from "./PerformanceStocks";
import * as Excel from 'exceljs'
import {Performance} from './PerformanceStocks'


const getStartAndEndDateOfCalculationTime = (date: Date): [Date, Date] => {
  const startDate = new Date(date.getTime())
  startDate.setMonth(0)

  const endDate = new Date(date.getTime())
  endDate.setMonth(11)

  return [startDate, endDate]
}

const getNextYear = (date: Date) => {
  const nextYear = new Date(date.getTime())
  nextYear.setFullYear(nextYear.getFullYear()+1)
  return nextYear
 
}

const getNextDatesToCompare = (date: Date): [Date, Date, Date] =>  {
  const startEnd = getStartAndEndDateOfCalculationTime(date)
  const nextYear = getNextYear(date)

  return [...startEnd, nextYear]

}

type PErformanceType = {
  startYear: Date;
  endYear: Date;
  performanceStockList: {
      valid: Performance[];
      invalid: Performance[];
  }

}

const generateData = (lastStockList :PErformanceType,
 actualStockList: PErformanceType) => {
  
      const performanceStockList = lastStockList.performanceStockList.valid

      const dataToSave: {name: string, vorherige: number, actual: number }[] = []

      for(const lastPerformance of performanceStockList){
        const name = lastPerformance.name!

        const actualPerformance = actualStockList.performanceStockList.valid.find(x => x.name === name)!
        dataToSave.push({name, vorherige: lastPerformance.performance, actual: actualPerformance?.performance})
      }
  return dataToSave

}


const run = (stock: StockList, start: Date) => {
  console.log("Run Faulbaer Methode")
  const workbook = generateExcelSheet()

 const performanceStockList =  generatePerformanceStockList(stock, start, new Date(), getNextDatesToCompare)
 //console.log(performanceStockList.stockPerformances[0])
 const newStart = new Date(start.getTime())
 // Erstes JAhr funktioniert nicht, erst ab 2.!
 newStart.setFullYear(newStart.getFullYear()+1)
 const endYearToCompare  = new Date()

 let [startYear, endYear,iterationYear] = getNextDatesToCompare(newStart)

 let lastexampleStockList = {startYear, endYear, performanceStockList: performanceStockList.getSortedPerformanceListByYear(startYear, endYear)}
 const historyStockLists = [lastexampleStockList]


 while(startYear.getTime() < endYearToCompare.getTime()){

  const newYears = getNextDatesToCompare(iterationYear)
  startYear = newYears[0]
  endYear = newYears[1]
  iterationYear = newYears[2]

  console.log("OLD",lastexampleStockList.startYear, lastexampleStockList.endYear)
  const exampleStockList = {startYear: new Date(startYear.getTime()), endYear: new Date(endYear.getTime()), performanceStockList: performanceStockList.getSortedPerformanceListByYear(startYear, endYear)} 
  historyStockLists.push(exampleStockList)
  

  console.log("New",startYear, endYear)

 
  const data = generateData(lastexampleStockList, exampleStockList)

  const add = (shet: Excel.Worksheet) => addContent(shet, 
    [
      {name: "Land", key: "name"},
      {name: lastexampleStockList.startYear.toDateString()+"-"+ lastexampleStockList.endYear.toDateString(), key: "vorherige"},
      {name: startYear.toDateString()+"-"+endYear.toDateString(), key: "actual"}

  ],
  data
  )

  addWorkSheet(workbook, startYear.toDateString()+"-"+endYear.toDateString(), add)
  saveFile(workbook, "test")


  lastexampleStockList = exampleStockList
 }
 
}


export default run