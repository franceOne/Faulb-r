import * as FileUtils from './FileDetector/FileUtils'
import * as MSCIFileFormater from './FileFormater/MSCIFileFormater'
import { saveFile } from './FileWriter/XLSWriter'
import { StockList } from './Stock/StockList'
import Faulbaer from './Templates/Faulbaer'


const debug = async() => {
  const content = FileUtils.getAllPathsWithExtensenion('./', "xls")
const parsedStocks = MSCIFileFormater.formatFile(content[0])
const stockList = new StockList(parsedStocks)

//await saveFile()

//console.log(stockList.getStockByName("Australia"))
}

export default debug