export interface VDomType {
  type: keyof HTMLElementTagNameMap;
  props?: Record<string, any>;
  children?: Array<VDomType | string>;
}
