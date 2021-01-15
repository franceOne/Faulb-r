import * as Excel from 'exceljs'




const generateColumn = (header: string, key: string, worksheet: Excel.Worksheet): Excel.Column => {
  return {header: header, key: key, outlineLevel: 1, hidden: false, style: {}, values: [], 
  letter: "arial", number: 1, isCustomWidth: false, isDefault: true, headerCount: 1,  equivalentTo: () => false, collapsed: true, eachCell: () => '',  
  headers: ['hi'], defn: undefined, worksheet: worksheet, width: 50  }

}


export const generateExcelSheet = () => {
  return new Excel.Workbook()
}

export const addWorkSheet = (workbook: Excel.Workbook, title: string, addContent: (sheet: Excel.Worksheet) => void) => {
  const workSheet = workbook.addWorksheet(title)
  addContent(workSheet)
}

export const addContent = (sheet: Excel.Worksheet, columns: {name: string, key: string}[], data: any[] ) => {

  const newColumns: Excel.Column[] = []

  for(const column of columns){
    newColumns.push(generateColumn(column.name, column.key, sheet))
  }

  sheet.columns = newColumns

 // Dump all the data into Excel
data.forEach((e, index) => {
  // row 1 is the header.
  const rowIndex = index + 2

  // By using destructuring we can easily dump all of the data into the row without doing much
  // We can add formulas pretty easily by providing the formula property.
  sheet.addRow({
    ...e,
    
  })
})
}

export const saveFile = async(book: Excel.Workbook, fileName: string) => {
  await book.xlsx.writeFile(fileName+'.xlsx')
}


