export type MessageType = "primary" | "danger" | "warning";

export interface Message {
  value: string;
  type: MessageType;
}

export interface MessageTypes {
  primary: string;
  danger: string;
  warning: string;
}
