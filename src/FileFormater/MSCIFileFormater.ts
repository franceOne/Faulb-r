import xlsx from 'node-xlsx';
import { ExcelDateToJSDate, isValidTimestamp } from './ExcelUtils';
import { Stock, StockData } from '../Stock/Stock';

export const getStartRow = (rows: any[][]): [number, {name: string, row: number}[]] => {
  let startRow = 0
  let stockNames: {name: string, row: number}[] = []

  for(let index in rows){
    //console.log(index, rows[index])
    
    if(rows[index][0] === "Date"){
      startRow = parseInt(index)+1
      //console.log("start", startRow, rows[startRow])
      const numOfRows = rows[index].length 
      for(let i = 1; i < numOfRows; i++){
        //console.log(rows[index][i])
        stockNames.push({name: rows[index][i], row: i})
      }
      break
    }
  }
  return [startRow, stockNames]

}

export const getStopRow = (start: number,  rows: any[][]) => {
  let endRow = start;
  
  for(let i = start; i< rows.length; i++){
    if(rows[i].length  === 0){
      endRow = i-1
      //console.log("end", i-1)
      //console.log(i-1, rows[i-1])
      //console.log(i, rows[i])
      break
    }
   
  }
  return endRow

}

export const formatMultipleFiles = (paths: string[]) => {
  let parsedStocks: Stock[] = []

  for(let path of paths ){
    parsedStocks = parsedStocks.concat(formatFile(path))
  }

  return parsedStocks
}

export const formatFile = (path: string): Stock[] => {
  const tables = xlsx.parse(path)
  const parsedStocks: Stock[] = []

  for(let rows of tables){
    const [start, stocks] = getStartRow(rows.data)
    const end = getStopRow(start, rows.data)
    const convertedRows:any[][] = rows.data


    console.log("StartRow:", start, "Endrow:", end)

    for(const stock of stocks){
      const stockData = convertDataToStockData(convertedRows, 0, stock.row, start, end, stock.name)
      //console.log(stockData[0])
      parsedStocks.push(new Stock(stock.name,  stockData))


    }
  }

  return parsedStocks

}


const convertDataToStockData = (rows: any[][],  dateRow: number,  priceRow: number, start: number, end: number, name: string): StockData[] => {
  const sotckData: StockData[] = []

  for(let i = start; i <= end; i++){
    const dateValue = rows[i][dateRow]
    const excelDate = ExcelDateToJSDate(dateValue)
    const date = isValidTimestamp(excelDate.getDate())  ? excelDate : null 
    let price = NaN

    if(!date){
      console.log(rows[i], date, dateValue, excelDate.getTime())
      throw new Error(`${dateValue} Error while parsing Date!!`)
    }
    if(priceRow < rows[i].length){
      price = parseFloat(rows[i][priceRow])
    }
    if(isNaN(price)){
      //console.log(name, ": Price could not been calculated", "priceRow", priceRow)
      //console.log(name, ": Price could not been calculated", rows[i], "priceRow", priceRow, price)
      //throw new Error("Price is NaN")
    }


    const data = {rowDate: date.getTime(), date, price}
    sotckData.push(data)

  }
  return sotckData

}