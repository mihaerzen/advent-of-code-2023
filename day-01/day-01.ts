import { readFile } from '../common/readFile.ts'

const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

const day01LineHandler = (line: string): number => {
  let firstNumberIndex = Infinity
  let lastNumberIndex = -1
  let firstNumber = -1
  let lastNumber = -1

  numbers.forEach((num, i) => {
    const firstIndex = line.indexOf(num)
    const lastIndex = line.lastIndexOf(num)

    if (firstIndex !== -1 && firstIndex < firstNumberIndex) {
      firstNumberIndex = firstIndex
      firstNumber = i + 1
    }

    if (lastIndex !== -1 && lastIndex > lastNumberIndex) {
      lastNumberIndex = lastIndex
      lastNumber = i + 1
    }
  })

  line.split('').forEach((char, idx) => {
    const num = parseInt(char, 10)
    if (isNaN(num)) {
      return
    }

    if (idx < firstNumberIndex) {
      firstNumberIndex = idx
      firstNumber = num
    }

    if (idx > lastNumberIndex) {
      lastNumberIndex = idx
      lastNumber = num
    }
  })

  return parseInt(`${firstNumber}${lastNumber}`, 10)
}

let sum = 0
const fileContents = await readFile('./day-01/input.txt')
fileContents.forEach((line) => {
  sum += day01LineHandler(line)
})

console.log(sum)
