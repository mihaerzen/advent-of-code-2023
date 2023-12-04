export const readFile = async (filePath: string): Promise<string[]> => {
  const fileContents = await Bun.file(filePath).text()

  return fileContents.split('\n').filter((v) => v.trim())
}
