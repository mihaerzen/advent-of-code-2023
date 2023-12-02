// Only 12 red cubes, 13 green cubes, and 14 blue cubes?

import { fileReader } from '../common/fileReader.js'

const triggerMap: Record<string, number | undefined> = {
  red: 12,
  green: 13,
  blue: 14,
} as const

let sum = 0
const gamesPossible: number[] = []
await fileReader({
  filePath: './day-02/input.txt',
  async onLine(line: string, index: number) {
    let possible = true
    const [game, rest] = line.split(':')
    const [, gameIdx] = game.split('Game ')
    const draws = rest.replace(/;/g, ',').split(',')

    draws.forEach((draw) => {
      const [, numberStr, color] = draw.split(' ')
      const num = parseInt(numberStr, 10)
      const offense = triggerMap[color]
      if (offense && num > offense) {
        possible = false
      }
    })

    if (possible) {
      const items = parseInt(gameIdx, 10)
      sum += items
      gamesPossible.push(items)
    }
  },
})

console.log(gamesPossible, sum)
