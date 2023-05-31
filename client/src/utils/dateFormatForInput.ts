export function dateFormatForInput(date: string | Date): string {
  let dd: number | string = 0;
  let mm: number | string = 0;
  let yy: number | string = 0;

  if (date) {
    const d = new Date(date);

    dd = d.getDate();

    if (dd < 10) {
      dd = "0" + dd;
    }
    mm = d.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    yy = d.getFullYear();

    return yy + "-" + mm + "-" + dd;
  } else {
    return;
  }
}
