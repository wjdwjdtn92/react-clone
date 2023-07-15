export interface HooksDataType {
  type: 'state' | 'memo';
  value: any;
  deps?: Array<any>;
}

export interface HooksType {
  data: Array<HooksDataType>;
  currentHook: number;
}
