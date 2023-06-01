export function dateFormat(date: string | Date): string {
  const d = new Date(date);

  let dd: number | string = d.getDate();
  if (dd < 10) {
    dd = "0" + dd;
  }
  let mm: number | string = d.getMonth() + 1;
  if (mm < 10) {
    mm = "0" + mm;
  }
  let yy: number | string = d.getFullYear();

  return dd + "." + mm + "." + yy;
}
