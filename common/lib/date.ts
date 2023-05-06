export function formatDate(date: number): string {
  const d = new Date(date);

  return new Intl.DateTimeFormat("ro").format(d);
}
