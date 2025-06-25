export const getMinutesFromStartTime = (value: string) => {
  const startMinute = parseInt(value.split(":")[1]);
  const distanceFromTop = (startMinute / 60) * 50;
  return distanceFromTop;
};
