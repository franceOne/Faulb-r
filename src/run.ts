import { exists } from 'fs'
import * as FileUtils from './FileDetector/FileUtils'
import * as MSCIFileFormater from './FileFormater/MSCIFileFormater'
import { StockList } from './Stock/StockList'
import Faulbaer from './Templates/Faulbaer'



const run = ( ) => {
  const content = FileUtils.getAllPathsWithExtensenion('./', "xls")
  console.log(content)
  const parsedStocks = MSCIFileFormater.formatMultipleFiles(content)
  
  const stockList = new StockList(parsedStocks)
  
  
  let startDate = Date.now()
  
  for(let stock of stockList.stocks){
    console.log(stock.data[0])
    if(stock.data[0].rowDate < startDate) startDate = stock.data[0].rowDate
  }
  console.log(stockList.stocks.length, "StartDate:", new Date(startDate))
  
  const australia = stockList.getStockByName("Australia")
  
  //console.log(australia)

  const start = new Date(startDate)
  console.log(australia?.getStockPriceByDataMonthly(start))
  
  Faulbaer(stockList, start)
}


export default run