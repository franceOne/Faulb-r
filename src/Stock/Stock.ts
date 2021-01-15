export type StockData = {
  date: Date,
  rowDate: number,
  price: number
}

export class Stock {
  name: string
  data: StockData[]

  constructor(name: string, data: StockData[]){
    this.name = name;
    this.data = data;
  }

    
  getStockPriceByDataMonthly(date: Date): StockData{
    const year = date.getFullYear()
    const month = date.getMonth()

    const stockData =  this.data.find(stockItem => {
      const stockYear = stockItem.date.getFullYear()
      const stockMonth = stockItem.date.getMonth()

      return stockYear === year && month === stockMonth
    })
    if(!stockData){
      return {date, rowDate: date.getTime(), price: NaN}
    }

    return stockData
  }
  
}