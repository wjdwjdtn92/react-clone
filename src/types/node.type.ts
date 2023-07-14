export interface nodeType {
  type: keyof HTMLElementTagNameMap;
  props?: any;
  children?: nodeType[] | string[];
}
