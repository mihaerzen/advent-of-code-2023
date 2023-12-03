type Props = {
  filePath: string
  onLine(line: string, index: number): Promise<void>
}

export const fileReader = async ({ onLine, filePath }: Props) => {
  const file = Bun.file(filePath)

  const stream = file.stream() // Contents as ReadableStream
  const reader = stream.getReader()
  const decoder = new TextDecoder('utf-8')

  let buffer = ''
  let done = false
  let lineIdx = 0
  while (!done) {
    // eslint-disable-next-line no-await-in-loop
    const result = await reader.read()
    done = result.done
    const chunk = decoder.decode(result.value ?? new Uint8Array())
    buffer += chunk

    let lineBreak = buffer.indexOf('\n')
    while (lineBreak > -1) {
      const line = buffer.slice(0, lineBreak)
      // eslint-disable-next-line no-await-in-loop
      await onLine(line, lineIdx++) // Process the line
      buffer = buffer.slice(lineBreak + 1)
      lineBreak = buffer.indexOf('\n')
    }
  }

  if (buffer.length > 0) {
    console.log(buffer) // Process any remaining text
  }

  reader.releaseLock()

  // Const file = await open(resolve(filePath))
  //
  // let i = 0
  // for await (const line of file.readLines()) {
  //   await onLine(line, i++)
  // }
}
