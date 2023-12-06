import { readFile } from '../common/readFile.ts'
import { parseInt10 } from '../common/parseInt10.js'

const fileContents = await readFile('day-05/input.txt', false)

const keyToValMap: Record<string, number> = {
  soil: 0,
  fertilizer: 1,
  water: 2,
  light: 3,
  temperature: 4,
  humidity: 5,
  location: 6,
}

const seeds: Array<[number, number]> = []

let currentMap = 0
const hashMap: Array<Array<[number, number, number]>> = []
fileContents.forEach((line, idx) => {
  if (!line) {
    return
  }

  if (idx === 0) {
    const map: Array<[number, number]> = line
      .split('seeds: ')[1]
      .split(' ')
      .map((str) => {
        const seed = parseInt10(str)
        return [seed, seed]
      })
    seeds.push(...map)
    return
  }

  if (line.includes('map:')) {
    const [, , to] = /(\w+)-to-(\w+)\s/.exec(line) ?? []
    currentMap = keyToValMap[to]
    return
  }

  const [destination, source, length] = line.split(' ').map(parseInt10)
  hashMap[currentMap] = hashMap[currentMap] ?? []
  hashMap[currentMap].push([destination, source, length])
})

const findDestinations =
  (key: number) =>
  (inputTuple: [number, number]): [number, number] => {
    let tuple: [number, number] = [...inputTuple]
    const input = inputTuple[0]
    hashMap[key].forEach(([destination, source, length]) => {
      if (input >= source && input <= source + length - 1) {
        const calculatedDestination =
          destination - source + (input - source) + source

        tuple = [input, calculatedDestination]
      }
    })

    return [tuple[1], tuple[1]]
  }

console.log(
  Math.min(
    ...seeds
      .map(findDestinations(0))
      .map(findDestinations(1))
      .map(findDestinations(2))
      .map(findDestinations(3))
      .map(findDestinations(4))
      .map(findDestinations(5))
      .map(findDestinations(6))
      .map(([l]) => l)
  )
)
// 265018614
