export function arrayFormat(array: string[]): string[] {
  const arrFormatted: string[] = [];

  if (array) {
    array.map((item, idx) => {
      if (idx > 0) {
        arrFormatted.push(" " + item);
      } else {
        arrFormatted.push(item);
      }
    });
  }

  return arrFormatted;
}
