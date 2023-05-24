export interface SystemsSettings {
  _id?: string;
  brand: string;
  link: string;
  footer: SystemsSettingsFooter;
}

export interface SystemsSettingsFooter {
  mainText: string;
  secondaryText: string;
  link: string;
  linkTitle: string;
}
