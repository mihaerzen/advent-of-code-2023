export const readFile = async (
  filePath: string,
  filterEmpty = true
): Promise<string[]> => {
  const fileContents = await Bun.file(filePath).text()

  const strings = fileContents.split('\n')
  if (filterEmpty) return strings.filter((v) => v.trim())
  return strings
}
