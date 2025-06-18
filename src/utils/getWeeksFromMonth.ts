import type { CalendarDay } from "../types/context";

export function getWeeksFromMonth(value: CalendarDay[], size: number) {
  let startIndex = 0;
  const result = [];
  while (startIndex < value.length) {
    result.push(value.slice(startIndex, startIndex + size));
    startIndex += size;
  }
  return result;
}
