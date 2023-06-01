import type { ICheckboxDropdownDefaultItem } from "@/types/ICheckboxDropdownDefaultItem";

export function shortingTableItems(
  accesessItems: ICheckboxDropdownDefaultItem[]
): string[] {
  const result: string[] = [];

  accesessItems.map((item) => {
    let regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(item.item);

    const arrValues: number[] = [];

    if (item.values) {
      item.values.map((i) => {
        arrValues.push(Number(i.substr(0, 5).replace(/\D+/g, "")));
      });
    }

    let str: string = "";
    if (matches) {
      str = matches[1] + " (п. " + arrValues + ")";

      result.push(str);
    }
  });

  return result;
}
