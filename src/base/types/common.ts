import { SxProps } from '@mui/material';

export interface WriteFieldItem {
  keyName?: string; // keyName is added when use function getWriteForm, do not need to define in writeConfig
  languageKey?: string;
  hideTitle?: boolean;
  titleNamespace?: string; // namespace for translate title
  titleSx?: SxProps;
  itemSx?: SxProps;
  defaultValue?: any;
  validate?: any;
  columns?: number;
  tooltipShow?: boolean;
  tooltipText?: {
    tooltipLangKey?: string;
    tooltipNameSpace?: string;
  };
  Component?: any;
  componentProps?: any;
  variableProps?: any;
  parseValue?: (value: any, extra?: any) => {} | null; // use to parse value which is passed to component, value is extra?.[_keyName], extra is data passed to getWriteForm
  parseParam?: (value: any) => {} | null; // use to parse final value of component before submit form
}

export interface WriteConfig {
  [x: string]: WriteFieldItem;
}
