interface IQualityControlOptionValue {
  num: string;
  grade: string;
  date: string;
}

export interface IQualityControlOptions {
  controlId: number;
  type: string;
  values: IQualityControlOptionValue[];
}
