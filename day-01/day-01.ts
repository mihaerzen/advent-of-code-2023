import { day01LineHandler } from './day01LineHandler.ts'
import { fileReader } from '../common/fileReader.ts'

let sum = 0
await fileReader({
  filePath: './day-01/input.txt',
  async onLine(line: string, index: number) {
    sum += day01LineHandler(line)
  },
})

console.log(sum)
