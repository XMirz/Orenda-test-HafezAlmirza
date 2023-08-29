
module.exports.getOffset = (page, take) => {
  if (!page || page < 1) page = 1
  const offset = (page - 1) * take
  return offset
}