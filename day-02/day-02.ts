import { readFile } from '../common/readFile.ts'
import { multiply, sum } from '../common/sum.ts'

const results: number[] = []

const fileContents = await readFile('./day-02/input.txt')
fileContents.forEach((line) => {
  const [, rest] = line.split(':')
  const draws = rest.replace(/;/g, ',').split(',')

  const colorMap: Record<string, number> = {}
  draws.forEach((draw) => {
    const [, numberStr, color] = draw.split(' ')
    const num = parseInt(numberStr, 10)
    const colorAmount = colorMap[color] ?? 0

    if (num > colorAmount) {
      colorMap[color] = num
    }
  })

  results.push(multiply(Object.values(colorMap)))
})

console.log(sum(results))
