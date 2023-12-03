import { parseInt10 } from './parseInt10.js'

export const isNumber = (char: string) => !isNaN(parseInt10(char))
