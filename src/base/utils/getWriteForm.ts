import { WriteConfig, WriteFieldItem } from '@base/types/common';

export const getParams = (mappingParams: any) => (data: any) => {
  const params: any = {};
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const parseParam = mappingParams[key];
      params[key] = parseParam ? parseParam(value) : value;
    });
  }
  return params;
};

const goParseData = (layoutFields: string[], writeConfig: any, value?: any) => {
  const fields: WriteFieldItem[] = [];
  const defaultValues: any = {};
  const mappingParams: any = {};

  //create Field based on page layout data
  layoutFields.forEach((_keyName: string, index: number) => {
    const fieldConfig: WriteFieldItem | null = writeConfig?.[_keyName] || null;

    if (!fieldConfig) return; // continue If there is no fieldconfig

    const { parseValue, parseParam, defaultValue: originDefaultValue } = fieldConfig ?? {};

    let defaultValue;
    if (value) {
      defaultValue = parseValue ? parseValue(value?.[_keyName], value) : value?.[_keyName];
    } else {
      defaultValue = originDefaultValue;
    }

    fields.push({
      ...fieldConfig,
      defaultValue,
      keyName: _keyName,
    });

    // Append default value of field
    defaultValues[_keyName] = defaultValue;
    // Append function parse of field
    mappingParams[_keyName] = parseParam;
  });
  return { fields, defaultValues, mappingParams };
};

export const getWriteForm = (
  layoutFields: string[],
  writeConfig: WriteConfig,
  value?: any,
): {
  fields: WriteFieldItem[];
  defaultValues: any;
  getParams: (formData: any) => any;
} => {
  const { defaultValues, mappingParams, fields } = goParseData(layoutFields, writeConfig, value);

  return {
    fields,
    defaultValues,
    getParams: getParams(mappingParams),
  };
};
