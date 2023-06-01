import type { ICheckboxDropdownDefaultItem } from "@/types/ICheckboxDropdownDefaultItem";
interface ControlValue {
  num: string;
  grade: string;
  date: string;
}
interface Control {
  type: string;
  values: ControlValue[];
  controlId: number;
}
// interface Access {
//   item: string;
//   values: string[];
// }

export interface ICertificate {
  certType: string;
  date: Date | string;
  numProtocol: string;
  textHead: string;
  firstname: string;
  secondname: string;
  lastname: string;
  birthday: Date | string;
  passport: string;
  numOldCert?: string;
  dateOldCert?: Date | string;
  work: string;
  workYears: number;
  qualifyingRank: string;
  attestationType: string;
  stigma: string[];
  stigmaGeneral: string;
  weldingMethod: string[];
  weldedType: string[];
  weldedSeam: string[];
  weldedConnection: string[];
  weldedPosition: string[];
  weldedJoint?: string[];
  axesPosition?: string[];
  preheating?: string[];
  heatTreatment?: string[];
  brand: string[];
  thickness: string[];
  diameter: string[];
  electrode: string[];
  flux: string[];
  controls: Control[];
  npa: string;
  grade: string;
  decision: string;
  accesses: ICheckboxDropdownDefaultItem[];
  expiration: Date | string;
  comission: string[];
  numCertificate: string;
  weldingMethodScope: string;
  weldedTypeScope: string[];
  weldedSeamScope: string[];
  brandScope: string[];
  electrodeScope: string[];
  fluxScope: string;
  auxiliaryScope: string;
  thicknessScope: string;
  diameterScope: string;
  weldedPositionScope: string[];
  weldedConnectionScope: string[];
  weldedJointScope: string[];
  axesPositionScope: string[];
  owner?: string;
  _id?: string;
}
