import { readFile } from '../common/readFile.js'
import { parseInt10 } from '../common/parseInt10.js'

const lines = await readFile('day-09/input.txt')

const last = (arr: number[]): number => arr[arr.length - 1]

const allZeros = (arr: number[]) => arr.filter((v) => v !== 0).length === 0

let res = 0
lines.forEach((line) => {
  let sequence = line.split(' ').map(parseInt10)

  const stack = [last(sequence)]
  while (!allZeros(sequence)) {
    sequence = sequence
      .map((el, i) => {
        const next = sequence[i + 1]
        if (next === undefined) return
        return next - el
      })
      .filter((v): v is number => v !== undefined)

    stack.push(last(sequence))
  }

  res += stack.reduce((acc, num) => acc + num, 0)
})

// 1696140818
console.log('res', res)
