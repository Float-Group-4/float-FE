export interface LabelValue<T = string, V = string> {
  label: T;
  value: V;
  extra?: any;
}
