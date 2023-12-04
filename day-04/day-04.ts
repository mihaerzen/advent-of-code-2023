import { readFile } from '../common/readFile.ts'
import { parseInt10 } from '../common/parseInt10.js'
import { sum } from '../common/sum.js'

const fileContents = await readFile('day-04/input.txt')

const cleanArray = (input: string): number[] =>
  input
    .split(' ')
    .filter((c) => c !== '')
    .map(parseInt10)

const scratchCardsWon: number[] = []
fileContents.forEach((line) => {
  const [, cardIdStr, cards, winning] =
    /Card\s+(\d+):\s{1,2}((?:\d{1,2}\s{0,2})+) \|\s{1,2}((?:\d{1,2}\s{0,2})+)/.exec(
      line
    ) ?? []

  const cardId = parseInt10(cardIdStr) - 1
  scratchCardsWon[cardId] = scratchCardsWon[cardId] ?? 0
  scratchCardsWon[cardId] += 1

  const cleanCards = cleanArray(cards)
  const cleanWinning = cleanArray(winning)

  let hits = 0
  cleanCards.forEach((c) => {
    if (cleanWinning.includes(c)) {
      hits++
    }
  })

  for (let i = cardId + 1; i <= cardId + hits; i++) {
    scratchCardsWon[i] = scratchCardsWon[i] ?? 0
    scratchCardsWon[i] += scratchCardsWon[cardId]
  }
})

console.log(sum(scratchCardsWon))
