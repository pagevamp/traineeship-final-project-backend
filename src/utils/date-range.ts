export function getDateRangeFloor(dateRange: string) {
  const firstDate = dateRange
    .replace(/[[\]()]/g, '')
    .split(',')[0]
    ?.trim();
  const date = new Date(firstDate);
  return date;
}

export function getDateRangeCeiling(dateRange: string) {
  const lastDate = dateRange
    .replace(/[[\]()]/g, '')
    .split(',')[1]
    ?.trim();
  const newDate = new Date(lastDate);
  return newDate;
}
