import { open } from 'node:fs/promises'
import { resolve } from 'path'

type Props = {
  filePath: string
  onLine(line: string, index: number): Promise<void>
}

export const fileReader = async ({ onLine, filePath }: Props) => {
  const file = await open(resolve(filePath))

  let i = 0
  for await (const line of file.readLines()) {
    await onLine(line, i++)
  }
}
