export function arrayFormat(array) {
  const arrFormatted = [];

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
