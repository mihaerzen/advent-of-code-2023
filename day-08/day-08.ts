/* eslint-disable @typescript-eslint/naming-convention */
import { readFile } from '../common/readFile.js'

const text = await readFile('day-08/input.txt')

type Direction = 'L' | 'R'

let directions = ''
const tree: Record<string, Record<Direction, string>> = {}
const nodesHashMap: Record<string, number> = {}
text.forEach((line, idx) => {
  if (idx === 0) {
    directions = line
    return
  }

  if (!line) return

  const [, node, L, R] = /(\w{3}) = \((\w{3}), (\w{3})\)/.exec(line) ?? []
  tree[node] = { L, R }

  if (node[2] === 'A') {
    nodesHashMap[node] = 0
  }
})

const directionsLength = directions.length

for (const startNode of Object.keys(nodesHashMap)) {
  let i = 0
  let node = startNode
  while (node[2] !== 'Z') {
    const direction = directions[i % directionsLength] as Direction
    node = tree[node][direction]
    i++
  }

  nodesHashMap[startNode] = i
}

// https://stackoverflow.com/a/61352020
const greatestCommonDivisor = (a: number, b: number): number =>
  b === 0 ? a : greatestCommonDivisor(b, a % b)
const leastCommonMultiple = (a: number, b: number): number =>
  (a / greatestCommonDivisor(a, b)) * b

console.log(
  Object.entries(nodesHashMap)
    .map(([, v]) => v)
    .reduce((acc, currentValue) => leastCommonMultiple(acc, currentValue), 1)
)
// 22289513667691
