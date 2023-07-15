export interface VDomType {
  type: keyof HTMLElementTagNameMap | Function;
  props?: Record<string, any>;
  children?: Array<VDomType | string>;
}
