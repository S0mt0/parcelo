export const changeToLocalDatetime = (timestamp: string): string => {
  const part1 = timestamp.split(":")[0];
  const part2 = timestamp.split(":")[1];

  const formattedTimestamp = `${part1}:${part2}`;

  return formattedTimestamp;
};
