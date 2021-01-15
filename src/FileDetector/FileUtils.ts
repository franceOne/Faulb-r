import * as fs from 'fs'
import * as path from 'path'
import { FileTypes } from './types';


export const getFoldercontent = (startPath: string) => {
  const fileNames: string[] = []
  fs.readdirSync(startPath).forEach(file => {
    fileNames.push(path.join(startPath, file))
  });
  return fileNames
}

export const getFileType = (path: string) => {
  const stats = fs.statSync(path)
  let fileTypes = null;
  if(stats.isFile())  fileTypes = FileTypes.FILE;
  else if(stats.isDirectory()) fileTypes = FileTypes.DIR

  return fileTypes
}


export const getAllPathsWithExtensenion = (pathString: string, extension: string) => {
  let paths: string[] = []
  const folderContent = getFoldercontent(pathString)

  folderContent.forEach(x => {
    const extensionOfFile = path.extname(x).substring(1)
    
    if(getFileType(x) === FileTypes.FILE && extensionOfFile === extension){
      paths.push(x)
    }
    else if(getFileType(x) === FileTypes.DIR){
      paths = paths.concat(getAllPathsWithExtensenion(x, extension))
    }
  })
return paths
}

