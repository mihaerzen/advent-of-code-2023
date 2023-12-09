import { readFile } from '../common/readFile.js'
import { parseInt10 } from '../common/parseInt10.js'

const text = await readFile('day-07/input.txt')

/* eslint-disable @typescript-eslint/naming-convention */
const cardStrength: Record<string, number> = {
  A: 12,
  K: 11,
  Q: 10,
  T: 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1,
  J: 0,
}
/* eslint-enable @typescript-eslint/naming-convention */

const getCardStrength = (c: string): number => cardStrength[c] ?? 0

const isOfKindHashMap: Record<string, boolean> = {}
const isOfKind = (n: number) => (hand: string) => {
  const hashKey = `${hand}-${n}`
  if (isOfKindHashMap[hashKey] !== undefined) {
    return isOfKindHashMap[hashKey]
  }

  const cardCounts: Record<string, number> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    J: 0,
  }

  for (const card of hand) {
    cardCounts[card] = cardCounts[card] ?? 0
    cardCounts[card]++

    if (cardCounts[card] === n) {
      return true
    }
  }

  for (const card of hand) {
    if (card === 'J') continue
    if (cardCounts[card] + cardCounts.J === n) {
      isOfKindHashMap[hashKey] = true
      return true
    }
  }

  isOfKindHashMap[hashKey] = false
  return false
}

const isFiveOfKind = isOfKind(5)

const isFourOfKind = isOfKind(4)

const isThreeOfKind = isOfKind(3)

const isPair = isOfKind(2)

const isTwoPairHashMap: Record<string, boolean> = {}
const isTwoPair = (hand: string) => {
  if (isTwoPairHashMap[hand] !== undefined) {
    return isTwoPairHashMap[hand]
  }

  const cardCounts: Record<string, number> = {}
  for (const card of hand) {
    cardCounts[card] = cardCounts[card] ?? 0
    cardCounts[card]++
  }

  let pairCount = 0
  for (const card in cardCounts) {
    if (cardCounts[card] === 2) {
      pairCount++
    }
  }

  const solution = pairCount === 2
  isTwoPairHashMap[hand] = solution
  return solution
}

const isFullHouseHashMap: Record<string, boolean> = {}
const isFullHouse = (hand: string) => {
  if (isFullHouseHashMap[hand] !== undefined) {
    return isFullHouseHashMap[hand]
  }

  const noJokers = hand.replaceAll('J', '')
  const [first, ...rest] = noJokers.split('').sort()
  const last = rest.slice(-1)[0]
  const compareStr = hand.replaceAll('J', first)

  const solution =
    ((compareStr.match(new RegExp(first, 'g')) ?? []).length === 3 &&
      (compareStr.match(new RegExp(last, 'g')) ?? []).length === 2) ||
    ((compareStr.match(new RegExp(last, 'g')) ?? []).length === 3 &&
      (compareStr.match(new RegExp(first, 'g')) ?? []).length === 2)
  isFullHouseHashMap[hand] = solution
  return solution
}

const compareHighCard = (handA: string, handB: string) => {
  for (let i = 0; i < handA.length; i++) {
    const cardStrength1 = getCardStrength(handA[i])
    const cardStrength2 = getCardStrength(handB[i])
    if (cardStrength1 === cardStrength2) {
      continue
    }

    return cardStrength1 > cardStrength2 ? 1 : -1
  }

  return 0
}

const sorted = text.sort((lineA, lineB) => {
  const [handA] = lineA.split(' ')
  const [handB] = lineB.split(' ')

  if (isFiveOfKind(handA) && isFiveOfKind(handB)) {
    return compareHighCard(handA, handB)
  }

  if (isFiveOfKind(handA)) {
    return 1
  }

  if (isFiveOfKind(handB)) {
    return -1
  }

  if (isFourOfKind(handA) && isFourOfKind(handB)) {
    return compareHighCard(handA, handB)
  }

  if (isFourOfKind(handA)) {
    return 1
  }

  if (isFourOfKind(handB)) {
    return -1
  }

  if (isFullHouse(handA) && isFullHouse(handB)) {
    return compareHighCard(handA, handB)
  }

  if (isFullHouse(handA)) {
    return 1
  }

  if (isFullHouse(handB)) {
    return -1
  }

  if (isThreeOfKind(handA) && isThreeOfKind(handB)) {
    return compareHighCard(handA, handB)
  }

  if (isThreeOfKind(handA)) {
    return 1
  }

  if (isThreeOfKind(handB)) {
    return -1
  }

  if (isTwoPair(handA) && isTwoPair(handB)) {
    return compareHighCard(handA, handB)
  }

  if (isTwoPair(handA)) {
    return 1
  }

  if (isTwoPair(handB)) {
    return -1
  }

  if (isPair(handA) && isPair(handB)) {
    return compareHighCard(handA, handB)
  }

  if (isPair(handA)) {
    return 1
  }

  if (isPair(handB)) {
    return -1
  }

  return compareHighCard(handA, handB)
})

console.log(
  sorted.reduce(
    (acc, line, currentIndex) =>
      acc + parseInt10(line.split(' ')[1]) * (currentIndex + 1),
    0
  )
)
// 249776650
