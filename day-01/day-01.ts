import { readFile } from '../common/readFile.ts'
import { day01LineHandler } from './day01LineHandler.ts'

let sum = 0
const fileContents = await readFile('./day-01/input.txt')
fileContents.forEach((line) => {
  sum += day01LineHandler(line)
})

console.log(sum)
