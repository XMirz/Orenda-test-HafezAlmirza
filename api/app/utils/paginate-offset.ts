export const getOffset = (page: number, take: number) => {
  if (!page || page < 1) page = 1
  const offset = (page - 1) * take
  return offset
}