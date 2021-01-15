import {Stock, StockData} from '../Stock/Stock'
export class StockList {

  stocks: Stock[]

  constructor(stocks: Stock[]) {
    this.stocks = stocks;
  }

  getStockByName(name: string){
    return this.stocks.find(stock => stock.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  }

  getStocksByDate(date: Date){

    const returningStock: Stock[] = []

    for(const stock of this.stocks){
      const stockData: (StockData)[] = []
        stockData.push(stock.getStockPriceByDataMonthly(date))
      returningStock.push(new Stock(stock.name, stockData))
    }
    return returningStock

  }

  getStocksByDates(dates: Date[]){

    const returningStock: Stock[] = []

    for(const stock of this.stocks){
      const stockData: (StockData)[] = []
      for(const date of dates){
        stockData.push(stock.getStockPriceByDataMonthly(date))
      }
      returningStock.push(new Stock(stock.name, stockData))
    }
    return returningStock

  }
  
}