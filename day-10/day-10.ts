import { readFile } from '../common/readFile.js'

const lines = await readFile('day-10/input.txt')

type Coord = [x: number, y: number]
type Char = 'J' | 'L' | 'F' | '7' | '|' | '-' | '.' | 'S'
type Direction = 'N' | 'S' | 'W' | 'E' | 'NE' | 'SE' | 'SW' | 'NW'

let start: Coord = [0, 0]
const matrix: readonly Char[][] = lines.map((line, y) => {
  const x = line.indexOf('S')
  if (x > -1) {
    start = [x, y]
  }

  return line.split('') as Char[]
})

const go = (coord: Coord, direction: Direction): Coord => [
  coord[0] + (direction.includes('E') ? 1 : direction.includes('W') ? -1 : 0),
  coord[1] + (direction.includes('N') ? -1 : direction.includes('S') ? 1 : 0),
]

const getChar = (coord: Coord): Char => matrix[coord[1]][coord[0]]

let steps = 0
let currentCoord: Coord = [...start]
let dir: Direction = 'E' // Leeroy Jenkins
while (getChar(currentCoord) !== 'S' || steps === 0) {
  const char = getChar(currentCoord)

  switch (char) {
    case '7':
      dir = dir === 'E' ? 'S' : 'W'
      break
    case 'F':
      dir = dir === 'W' ? 'S' : 'E'
      break
    case 'J':
      dir = dir === 'S' ? 'W' : 'N'
      break
    case 'L':
      dir = dir === 'S' ? 'E' : 'N'
      break
    case 'S':
    case '|':
    case '-':
    case '.':
    default:
      break
  }

  currentCoord = go(currentCoord, dir)

  steps++
}

console.log(steps / 2)
