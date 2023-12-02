import { day01LineHandler } from './day01LineHandler.ts'

const lines: Array<[string, number]> = [
  ['two1nine', 29],
  ['eightwothree', 83],
  ['abcone2threexyz', 13],
  ['xtwone3four', 24],
  ['4nineeightseven2', 42],
  ['zoneight234', 14],
  ['7pqrstsixteen', 76],
  ['s8twoned', 81],
]

describe('day day-01', () => {
  lines.forEach(([input, expectation]) => {
    it('given ' + input + ' should return ' + expectation, () => {
      const actual = day01LineHandler(input)
      expect(actual).toEqual(expectation)
    })
  })
})
