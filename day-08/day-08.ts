/* eslint-disable @typescript-eslint/naming-convention */
import { readFile } from '../common/readFile.js'

const text = await readFile('day-08/input.txt')

type Direction = 'L' | 'R'

let directions = ''
const tree: Record<string, Record<Direction, string>> = {}
text.forEach((line, idx) => {
  if (idx === 0) {
    directions = line
    return
  }

  if (!line) return

  const [, node, L, R] = /(\w{3}) = \((\w{3}), (\w{3})\)/.exec(line) ?? []
  tree[node] = { L, R }
})

const directionsLength = directions.length
let i = 0
let node = 'AAA'
while (node !== 'ZZZ') {
  const direction = directions[i % directionsLength] as Direction
  node = tree[node][direction]
  i++
}

console.log(i)
// 23147
