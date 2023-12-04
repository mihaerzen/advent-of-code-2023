import { readFile } from '../common/readFile.ts'
import { parseInt10 } from '../common/parseInt10.js'

const fileContents = await readFile('day-04/input.txt')

const cleanArray = (input: string): number[] =>
  input
    .split(' ')
    .filter((c) => c !== '')
    .map(parseInt10)

let sum = 0
fileContents.forEach((line) => {
  const [, cardId, cards, winning] =
    /Card\s+(\d+):\s{1,2}((?:\d{1,2}\s{0,2})+) \|\s{1,2}((?:\d{1,2}\s{0,2})+)/.exec(
      line
    ) ?? []

  const cleanCards = cleanArray(cards)
  const cleanWinning = cleanArray(winning)

  let hits = 0
  cleanCards.forEach((c) => {
    if (cleanWinning.includes(c)) {
      hits++
    }
  })
  sum += hits > 0 ? 2 ** (hits - 1) : 0
})

console.log(sum)
