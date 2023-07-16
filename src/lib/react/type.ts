export enum HOOK_TYPE {
  STATE,
  MEMO,
}

export interface HooksDataType {
  type: HOOK_TYPE;
  value: any;
  deps?: Array<any>;
}

export interface HooksType {
  data: Array<HooksDataType>;
  currentHook: number;
}
