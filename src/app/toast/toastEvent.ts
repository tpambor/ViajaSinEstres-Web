export enum EventTypes {
  Success = 'success',
  Error = 'error',
}

export interface ToastEvent {
  type: EventTypes;
  message: string;
}
