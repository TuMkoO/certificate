export function shortingTableItems(accesessItems) {
  // const arr = [];
  // // console.log(item);
  // if (item) {
  //   item.map((i) => {
  //     arr.push(Number(i.replace(/\D+/g, "")));
  //   });
  // }

  // return arr;

  const result = [];

  accesessItems.map((item) => {
    let regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(item.item);

    const arrValues = [];

    if (item.values) {
      item.values.map((i) => {
        arrValues.push(Number(i.substr(0, 5).replace(/\D+/g, "")));
      });
    }

    let str = matches[1] + " (п. " + arrValues + ")";
    result.push(str);
  });

  return result;
}
