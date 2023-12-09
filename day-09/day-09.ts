import { readFile } from '../common/readFile.js'
import { parseInt10 } from '../common/parseInt10.js'

const lines = await readFile('day-09/input.txt')

const allZeros = (arr: number[]) => arr.filter((v) => v !== 0).length === 0

let res = 0
lines.forEach((line) => {
  let sequence = line.split(' ').map(parseInt10)

  const stack = [sequence[0]]
  while (!allZeros(sequence)) {
    sequence = sequence
      .map((el, i) => {
        const next = sequence[i + 1]
        if (next === undefined) return
        return next - el
      })
      .filter((v): v is number => v !== undefined)
    stack.push(sequence[0])
  }

  let z: number | undefined
  for (let i = stack.length - 1; i >= 0; i--) {
    const x: number = z ?? stack[i]
    const y = stack[i - 1]
    if (y !== undefined) z = y - x
  }

  res += z ?? 0
})

// 1152
console.log('res', res)
