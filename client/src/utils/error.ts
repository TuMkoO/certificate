interface Codes {
  [key: string]: string;
}

const ERROR_CODES: Codes = {
  SOME_CODE: "Пользователь с таким email не был найден",
  auth: "Пожалуйста, войдите в систему",
};

export function error(code: string): string {
  return ERROR_CODES[code] ? ERROR_CODES[code] : "Неизвестная ошибка";
}
