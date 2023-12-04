import { isNumber } from '../common/isNumber.ts'
import { sum } from '../common/sum.ts'
import { parseInt10 } from '../common/parseInt10.ts'
import { readFile } from '../common/readFile.js'

const makeKey = (x: number, y: number) => `${x},${y}`

function sumPartNumbers(input: string[]): number {
  const rows = input.map((row) => row.split(''))
  const visited = new Set<string>()
  const gearRatios: Record<string, [number, number]> = {}

  function checkAndSum(i: number, j: number, x: number, y: number) {
    if (
      x < 0 ||
      y < 0 ||
      x >= rows.length ||
      y >= rows[x].length ||
      visited.has(makeKey(x, y)) ||
      !isNumber(rows[x][y])
    ) {
      return
    }

    let numStr = ''
    const origY = y
    while (y < rows[x].length && isNumber(rows[x][y])) {
      numStr += rows[x][y]
      visited.add(makeKey(x, y))
      y++
    }

    y = origY - 1
    while (y >= 0 && isNumber(rows[x][y])) {
      numStr = rows[x][y] + numStr
      visited.add(makeKey(x, y))
      y--
    }

    const key = makeKey(i, j)
    const [val, flag] = gearRatios[key] ?? [1, 0]
    gearRatios[key] = [val * parseInt10(numStr), flag + 1]
  }

  rows.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== '*') {
        return
      }

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) {
            continue
          }

          checkAndSum(i, j, i + dx, j + dy)
        }
      }
    })
  })

  return sum(
    Object.values(gearRatios)
      .filter(([, flag]) => flag > 1)
      .map(([v]) => v)
  )
}

const fileContents = await readFile('day-03/input.txt')

console.log(sumPartNumbers(fileContents))
