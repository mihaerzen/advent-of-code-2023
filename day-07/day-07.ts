import { readFile } from '../common/readFile.js'
import { parseInt10 } from '../common/parseInt10.js'

const text = await readFile('day-07/input.txt')

/* eslint-disable @typescript-eslint/naming-convention */
const cardStrength: Record<string, number> = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  '9': 7,
  '8': 6,
  '7': 5,
  '6': 4,
  '5': 3,
  '4': 2,
  '3': 1,
  '2': 0,
}
/* eslint-enable @typescript-eslint/naming-convention */

const getCardStrength = (c: string) => cardStrength[c] ?? 0

const isFiveOfKind = (hand: string) =>
  (hand.match(new RegExp(hand[0], 'g')) ?? []).length === 5

const isFourOfKind = (hand: string) =>
  (hand.match(new RegExp(hand[0], 'g')) ?? []).length === 4 ||
  (hand.match(new RegExp(hand[1], 'g')) ?? []).length === 4

const isThreeOfKind = (hand: string) =>
  (hand.match(new RegExp(hand[0], 'g')) ?? []).length === 3 ||
  (hand.match(new RegExp(hand[1], 'g')) ?? []).length === 3 ||
  (hand.match(new RegExp(hand[2], 'g')) ?? []).length === 3

const isTwoPair = (hand: string) => {
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

  return pairCount === 2
}

const isPair = (hand: string) =>
  (hand.match(new RegExp(hand[0], 'g')) ?? []).length === 2 ||
  (hand.match(new RegExp(hand[1], 'g')) ?? []).length === 2 ||
  (hand.match(new RegExp(hand[2], 'g')) ?? []).length === 2 ||
  (hand.match(new RegExp(hand[3], 'g')) ?? []).length === 2

const isFullHouse = (hand: string) => {
  const [first, ...rest] = hand.split('').sort()
  const last = rest.slice(-1)[0]

  return (
    ((hand.match(new RegExp(first, 'g')) ?? []).length === 3 &&
      (hand.match(new RegExp(last, 'g')) ?? []).length === 2) ||
    ((hand.match(new RegExp(last, 'g')) ?? []).length === 3 &&
      (hand.match(new RegExp(first, 'g')) ?? []).length === 2)
  )
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

console.log(sorted)

console.log(
  sorted.reduce((acc, line, currentIndex) => {
    const [, bid] = line.split(' ')
    acc += parseInt10(bid) * (currentIndex + 1)
    return acc
  }, 0)
)
