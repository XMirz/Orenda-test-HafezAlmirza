export const getOffset = (page: number, take: number) => {
  const offset = (page - 1) * take;
  return offset;
};
